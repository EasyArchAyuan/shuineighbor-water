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

## 视觉（以官方规范为准）
- **品牌色取自官方《水邻居品牌视觉规范手册》V1.0（2026）05-03 Color System**，不要凭感觉调：
  - 主色 **中蓝色 `#3D719F`** → `--brand`
  - 辅助色 **浅绿色 `#7EB188`** → `--accent`（浅底文字用加深版 `--accent-text:#4E7F58`，保证 4.5:1）
  - 背景色 **暖白色 `#FAF8F3`** → `--bg`；深色面 `--brand-deep:#24435F`（主色加深）
  - 规范使用建议：「以中蓝色为主，浅绿色为辅，暖白色为底」
- **Logo**：由物料库提取，已抠成透明 PNG 并压到 17KB 总计
  - `public/brand/logo.png` = Logo 主标（邻里标签徽章 +「✓今日已送达」），用于浅底
  - `public/brand/logo-white.png` = 金色艺术字，用于深底（页脚）
  - 源头在 `D:\剪辑素材\美好商贸\宣传物料\水邻居\`（同一个 `.ai` 源文件里有 10L 桶标矢量）
- **slogan「简单生活·纯净相伴」**（规范封面口径），存于 `company.slogan`，用于页脚、`/about`、JSON-LD、OG 图。
- 注意：用户最初给我的那张 logo JPG（藏青+金、带水印）来自设计素材模板站，**不是**最终品牌资产；已改用物料库里的规范版本。

## ⚠️ 物料库里的合规雷区（不要对外使用）
- `水邻居桶装水促销封面图.png` / `促销活动长图.png`：画面写「**打垮廊坊 怡宝价格天花板！32桶仅460元**」
  → 点名竞品 + 价格对比，违反品牌合规红线。
- `【水邻居18.9L】PREMIUM PURIFIED WATER`：英文 **PURIFIED WATER（纯净水）** 与本品类「饮用天然水」冲突，不可直接使用。

## 域名（现用）
- `linju.meihaowater.site`（meihaowater.site 子域名）。全站域名只在 `src/data/site.ts` 的 `domain`/`url` 两处定义。
- ⚠️ **DNSPod 容易填错**：DNSPod 的「主机记录」只填 **`linju`**（子域名前缀），
  填成完整域名会创建出 `linju.meihaowater.site.meihaowater.site`。用
  `wget -qO- "https://dns.alidns.com/resolve?name=<域名>&type=A"` 在服务器上可直接验证。


## 素材待补（站内已用占位，不阻塞上线）
logo **已完成**（见上「视觉」）。其余待补：18.9L 产品图｜水源地配图｜公众号二维码｜门店地图｜ICP 备案号。
素材清单与替换方式见 `README.md`。

## 部署现状（2026-09-13）
- 仓库 `EasyArchAyuan/shuineighbor-water`（public，HTTPS remote）。远程分支：`main` + `dist`（产物）。
- CI 首跑成功：自动发 **v1.0.0**（tag + Release）、产物推 `dist`。
  **说明新仓库的 Workflow permissions 已可写**（母站当初需要手动开）。
- 服务器已就绪：`/var/www/shuineighbor/out`（3.3M，路由齐全）、
  `/usr/local/bin/shuineighbor-pull.sh`（82 行）、root crontab **两行**（mhsy + shuineighbor，已复核）。
  手动拉取验证通过：`deployed 8898e54b…`。
- ⛔ **唯一剩余阻塞**：`linju.meihaowater.site` 的 DNSPod 记录填错（见上「域名」），
  修好后才能给 Caddy 加站点块（否则 ACME 签发失败）。
- Caddy 块 2 的内容已规划：`linju.meihaowater.site { root * /var/www/shuineighbor/out; ... }`，
  追加进**母站仓库** `infra/Caddyfile`，用 raw 拉取 + `caddy validate` + 备份 + `cp` + `systemctl reload caddy` 应用。

