# 水邻居官网 · 项目长期记忆

## 仓库与分支
- 远程：https://github.com/EasyArchAyuan/shuineighbor-water （public）
- **默认 / 部署分支：`main`**。推送：`git push origin main`。
- 由母站仓库 `EasyArchAyuan/meihao-water` 克隆改造而来（2026-09-13），**全新 git 历史**（未继承母站变更记录）。
- 远程另有 `dist` 分支 = 构建产物（`site.tar.gz` + `site.sha256`，orphan + force push 保持单 commit），不要手工改。

## 品牌与内容口径
- 品牌「水邻居」是**美好水业（廊坊市美好商贸有限公司）旗下自有品牌**，2020 年自主研发推出。
- **公开背书策略**：首页、`/about`、页脚均出现「美好水业旗下」，并链向母站。
- 页脚主体用法律实体「廊坊市美好商贸有限公司」；主号沿用手机 `13393067179`（另有 `2805599` / `2232111`）。
- 公众号为**水邻居**（与母站的「廊坊桶装水」区分）。
- 主营：**18.9L 桶装水**、**10L 一次性桶装水**（后续加品）。
- ⚠️ **合规红线**：产品法定类别是**饮用天然水（GB 19298）**。全站禁止出现「矿泉水」；
  「锶 / 偏硅酸」属 GB 8537 矿泉水界限指标，无检测报告不得作卖点。
  CI 的 smoke test 已把 `矿泉水` 断言加到 5 个页面上，出现即构建失败。

## 域名
- 现用 `linju.meihaowater.site`（meihaowater.site 子域名）。全站域名只在 `src/data/site.ts` 的
  `domain` / `url` 两处定义，后续迁移独立域名的改动清单见 `docs/deploy-lighthouse.md` §六。

## 页面结构（5 页）
`/` 首页 ｜ `/products` 产品与服务 ｜ `/source` 水源与品质 ｜ `/about` 关于水邻居 ｜ `/contact` 联系我们
**没有**代理品牌页（那是母站的渠道生意）。

## 单一数据源（改内容先改这里）
`src/data/{site,company,products,media,navigation}.ts`。页面只引用、不硬编码。
图片唯一出口 `<Figure id>`；Logo 唯一出口 `src/components/layout/Logo.tsx`（读 `site.logo`）。

## 部署（与母站共用一台 Lighthouse）
- 实例 `lhins-jrsby4oa`（ap-beijing，`49.233.87.42`）；站点目录 `/var/www/shuineighbor/out`。
- 模式：**服务器主动拉**（Runner 到服务器 22 端口 TCP UNREACHABLE）。CI 构建→推 `dist`→
  服务器 cron 每 10 分钟跑 `/usr/local/bin/shuineighbor-pull.sh`（flock 防重叠）→ sha256 校验 → 原子切换。
- ⚠️ **crontab 用 `crontab -` 是整体替换**：加新条目必须 `printf '%s\n%s\n' "$(crontab -l)" '<新行>' | crontab -`，
  否则会抹掉母站的 mhsy-pull 条目。
- ⚠️ **Caddyfile 不归本仓库**：`/etc/caddy/Caddyfile` 是服务器级共享配置（含母站块），
  由母站仓库 `meihao-water` 维护；本仓库没有 `infra/Caddyfile`、没有 caddy job。
- 默认服务器拉取模式**不需要任何 Secret**；只有 `DEPLOY_MODE=ssh` 才需要 SSH 相关。

## 视觉
- Apple 式极简，soft natural light。品牌色为低饱和蓝绿：`--brand:#17786f`、
  `--brand-bright/--accent:#63c9c1`、`--accent-tint:#edf7f5`；深色面 `--brand-deep:#0a2540`（与 logo 藏青一致）。
- 注意：logo 本身是**藏青 + 金**，与站点主色（蓝绿）不一致——站点按用户决定沿用蓝绿，属有意选择。

## 素材待补（站内已用占位，不阻塞上线）
logo（彩版+反白版）｜18.9L 产品图｜水源地配图｜公众号二维码｜门店地图｜品牌 slogan（`TODO: REAL_SLOGAN`）｜ICP 备案号。
素材清单与替换方式见 `README.md`。
