# 部署（腾讯云 Lighthouse + Caddy）

## 概览

| 项 | 值 |
|---|---|
| 实例 | `lhins-jrsby4oa`（ap-beijing，公网 `49.233.87.42`，Ubuntu 24.04） |
| 域名 | `linju.meihaowater.site`（后续迁移独立域名） |
| 站点根 | `/var/www/shuineighbor/out`（属主 root，旧版本留 `out.prev`） |
| Web 服务 | Caddy，配置 `/etc/caddy/Caddyfile` |
| SSH 用户 | `ubuntu`（免密 sudo） |
| 部署模式 | **服务器主动拉**（服务器无需 git / Node） |
| 链路 | `push main` → CI(lint+build) → semantic-release → 产物推 `dist` → 服务器 cron 拉取 |

**同一个实例上还有美好水业站点**（`/var/www/mhsy/out`，4 个主机名）。两者独立：不同目录、
不同拉取脚本、不同 cron 条目。改动一处不要影响另一处。

## 为什么用「服务器主动拉」

两条网络限制同时成立：

1. 服务器连不上 `github.com`（443 超时），因此服务器不能 `git pull`
2. **GitHub 托管 Runner 连不上服务器的 22 端口**（TCP 探针 `UNREACHABLE`，sshd 日志无任何连接记录）

唯一可用通道是 `raw.githubusercontent.com`。所以：CI 打包产物推到 `dist` 分支
（orphan + force push，始终单 commit），服务器从 raw 拉取并原子切换。

## 一、服务器一次性准备

### 1. DNS

为 `linju.meihaowater.site` 添加 A 记录 → `49.233.87.42`。
**先确认解析生效**再动 Caddy，否则 ACME 签发会失败：

```bash
nslookup linju.meihaowater.site 8.8.8.8
```

### 2. 站点目录

```bash
sudo mkdir -p /var/www/shuineighbor
```

（脚本要往 `SITE.new` 写，父目录必须存在；`out` 本身由 root 脚本创建）

### 3. 安装拉取脚本

脚本纳入仓库，服务器从 raw 拉取安装（**不要手工转录 base64**）：

```bash
wget -qO- --timeout=60 \
  https://raw.githubusercontent.com/EasyArchAyuan/shuineighbor-water/main/infra/shuineighbor-pull.sh \
  | dd of=/usr/local/bin/shuineighbor-pull.sh
chmod +x /usr/local/bin/shuineighbor-pull.sh
wc -c < /usr/local/bin/shuineighbor-pull.sh   # 与仓库内文件字节数一致
```

### 4. 注册 cron（⚠️ 必须保留原有条目）

`crontab -` 是**整体替换**，不是追加。只写一行会抹掉美好水业的拉取任务。

```bash
crontab -l                    # ① 先留档，确认现状（预期已有一行 mhsy-pull）
printf '%s\n%s\n' "$(crontab -l)" \
  '*/10 * * * * flock -n /tmp/shuineighbor-pull.lock /usr/local/bin/shuineighbor-pull.sh' | crontab -
crontab -l                    # ② 复核：两行都在
```

日志写在脚本内部（`exec >>/var/log/shuineighbor-pull.log 2>&1`）——命令里的 `>>` 会被执行通道拦截。

### 5. Caddy 站点块

`/etc/caddy/Caddyfile` 是**服务器级共享配置**，归**母站仓库** `meihao-water` 维护（单一事实来源）。
本站上线时在母站仓库的 `infra/Caddyfile` 里追加第二个站点块：

```
linju.meihaowater.site {
	root * /var/www/shuineighbor/out
	file_server
	# header / 4 组带 matcher 的 Cache-Control / encode 与母站块一致
}
```

要点：

- 主机名 `linju.meihaowater.site` 不在母站块的主机名列表内 → 落入本站块，
  **单独签发一张证书**，与母站的 SAN 证书互不影响，无需泛域名
- 全局 `{ email … }` 只保留一份，两站点块共用
- `Cache-Control` 必须**全部用 matcher 表达**（无 matcher 的 `header {}` 会覆盖带 matcher 的同名 header）

应用（合并后文件约 2.4KB，**超过单条命令 2048 字符上限，必须走 raw 拉取**）：

```bash
wget -qO- https://raw.githubusercontent.com/EasyArchAyuan/meihao-water/main/infra/Caddyfile | dd of=/tmp/Caddyfile.new
caddy validate --config /tmp/Caddyfile.new                       # 必须先过
cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%s)     # 备份
cp /tmp/Caddyfile.new /etc/caddy/Caddyfile && systemctl reload caddy
journalctl -u caddy -n 30 --no-pager | grep -iE 'certificate|acme'
```

### 6. GitHub 仓库设置

- Settings → Actions → General → **Workflow permissions = Read and write** → **拉到底点 Save**（不点 Save 不生效）
- **无需任何 Secret**：默认服务器拉取模式下，CI 只需要内置 `GITHUB_TOKEN` 与 `contents: write`
- 只有切到 SSH 模式（设 Variables `DEPLOY_MODE=ssh`）才需要 `SSH_PRIVATE_KEY` 与
  `SSH_HOST` / `SSH_USER` / `SSH_PORT`

### 7. 首次上线

push `main` 后 CI 的 `publish-dist` 会自动创建 `dist` 分支。想让服务器立刻可拉，
也可以本地先用 water-site-factory 技能的 `scripts/pack_site.py --push-dist` 引导一次。

## 二、日常发布

```bash
git add -A
git commit -m "feat(scope): 说明"     # feat→minor, fix→patch, docs/chore/ci 不发版
git push origin main
```

自动完成：lint + build → 定版本 + tag + GitHub Release + CHANGELOG → 产物进 `dist` →
服务器 10 分钟内自动上线。

首次看到线上变化可能有几分钟延迟（cron 周期 + 下载约 1 分钟 + CDN 缓存），属正常。

## 三、验收

```bash
# 服务器上
S=https://linju.meihaowater.site
for u in / /products/ /source/ /about/ /contact/; do
  echo "$u -> $(wget -q -S --method=HEAD -O - $S$u 2>&1 | grep -o 'HTTP/1.1 [0-9]*')"
done
wget -qO- $S/ | grep -c 13393067179            # 电话
wget -qO- $S/ | grep -c 水邻居                  # 品牌名
wget -qO- $S/source/ | grep -c 矿泉水           # 必须为 0（合规）
wget -q -S --method=HEAD -O - $S/ 2>&1 | grep -i cache-control   # no-cache

# 隔离性：母站必须不受影响
for h in xn--vhqu7tjwbb1iwpthm1a.online meihaowater.site www.meihaowater.site; do
  echo "$h -> $(wget -q -S --method=HEAD -O - https://$h/ 2>&1 | grep -o 'HTTP/1.1 [0-9]*')"
done
crontab -l | grep -c pull.sh                    # 应为 2
```

手动跑一次拉取脚本：

```bash
/usr/local/bin/shuineighbor-pull.sh
tail -5 /var/log/shuineighbor-pull.log          # 期望 deployed <sha> 或 no-change <sha>
```

## 四、回滚

**服务器本地秒级**（推荐，服务器拉取模式下唯一可用方式）：

```bash
SITE=/var/www/shuineighbor/out
rm -rf "${SITE}.bad"
sudo mv "$SITE" "${SITE}.bad"
sudo mv "${SITE}.prev" "$SITE"
```

⚠️ 下一次 cron 拉取会把它覆盖回最新版。要长期停留旧版，先暂停 cron
（`crontab -l | sed 's/^/#/' | crontab -`），修好后再恢复。

`.github/workflows/rollback.yml` 是 SSH 模式下的回滚，默认不适用（Runner 到 22 端口不通）。

## 五、排障

| 现象 | 首查 |
|---|---|
| 站点 404 / 502 | `systemctl status caddy`；`ls -ld /var/www/shuineighbor/out` |
| 证书没签下来 | DNS 是否解析到本机；`journalctl -u caddy -n 50 \| grep -i acme`；80/443 是否放行 |
| 线上内容没更新 | `tail /var/log/shuineighbor-pull.log`；`dist` 分支的 `site.sha256` 是否变了 |
| 拉取报 sha mismatch | raw 的 CDN 缓存，脚本会自动重试 3 次；持续失败看 `dist` 分支是否推成功 |
| 缓存头不对 | Caddyfile 的 matcher 写法（见「5. Caddy 站点块」要点） |
| 母站挂了 | 立即 `cp /etc/caddy/Caddyfile.bak.<ts> /etc/caddy/Caddyfile && systemctl reload caddy` |

## 六、迁移到独立域名

只改三处：

1. `src/data/site.ts` 的 `domain` 与 `url`
2. 母站仓库 `infra/Caddyfile`：新域名加进本站块的主机名列表（并保留旧域名一段时间做跳转）
3. `.github/workflows/ci-cd.yml` 与 `rollback.yml` 里的 smoke test 域名

另：新域名要加 DNS A 记录；若做微信站长认证，新的校验文件放进 `public/`。
