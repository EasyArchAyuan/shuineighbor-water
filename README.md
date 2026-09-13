# 水邻居官网

美好水业旗下自有品牌「水邻居」的独立官网。Next.js 16 静态导出，托管在腾讯云 Lighthouse（Caddy），
CI 自动发版 + 服务器主动拉取部署。

- **线上**：https://linju.meihaowater.site
- **仓库**：https://github.com/EasyArchAyuan/shuineighbor-water
- **母站**（美好水业）：https://meihaowater.site ｜ 本仓库由母站仓库克隆改造而来

## 技术栈

| 项 | 说明 |
|---|---|
| 框架 | Next.js 16（App Router）+ React 19 + TypeScript |
| 样式 | Tailwind CSS 4 + CSS 变量设计令牌（`src/app/globals.css`） |
| 导出 | `output: "export"` + `trailingSlash` → `out/`，**无服务端运行时** |
| 动效 | motion（`src/components/ui/Reveal.tsx`） |
| 发版 | semantic-release（`.releaserc.json`）+ GitHub Actions |
| 部署 | 服务器 cron 从 `dist` 分支拉取（见 `docs/deploy-lighthouse.md`） |

## 本地开发

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build    # 产出 out/
npm run serve    # 本地静态预览 out/
```

Node 版本见 `.nvmrc`（22）。

### 产物自检

```bash
python scripts/verify_out.py
```

校验：必现内容（品牌名 / 电话 / 法律实体 / 母品牌背书 / 站点域名）、禁现内容
（**`矿泉水`**、母站遗留域名与标语）、5 个路由齐备、sitemap 全部指向本站域名，并统计占位数量。
**改完文案建议跑一次**，退出码 0 才算通过。

## 内容维护约定

**改内容先改 `src/data/`，不要直接改页面**——页面只引用数据。

| 文件 | 管什么 | 改它会影响 |
|---|---|---|
| `src/data/site.ts` | 品牌名、**域名（唯一出处）**、SEO 描述与关键词、页面 title 后缀、logo 资产、母品牌背书 | 全站 metadata / sitemap / robots / OG / JSON-LD |
| `src/data/company.ts` | 法律实体、**电话**、公众号、地址、产品类别、创立年份 | 所有拨号入口、页脚、JSON-LD |
| `src/data/products.ts` | 产品（名称 / 规格 / 卖点 / 场景 / 配图 id） | `/products` 与首页产品段 |
| `src/data/media.ts` | 图片清单 `{ id, src, alt, ratio, note, todo }` | 所有 `<Figure>` |
| `src/data/navigation.ts` | 顶部导航 | Navbar / MobileMenu / Footer |

### 图片

- 图片只有一个出口：`<Figure id="...">`，**不要在页面里直接写 `<Image>`**
- 素材未到位时在 `media.ts` 里把 `src` 设为 `null` → 渲染中性占位块并打
  `data-placeholder="TODO: REPLACE_WITH_REAL_IMAGE"`；替换只改 `src` 不动组件
- 自检：`python <water-site-factory 技能>/scripts/check_media.py .`

### Logo

Logo 唯一出口是 `src/components/layout/Logo.tsx`，资产路径在 `site.ts` 的 `logo` 字段：

```ts
logo: { color: null, white: null, colorIsWordmark: false }
```

- 出图后填入路径即可，组件无需改动；`color` 为彩版（浅底）、`white` 为反白版（深底）
- **素材未到位时会渲染「水邻居」文字标**（不是破图），因此现在就能上线

### 站点结构（5 页）

| 路由 | 内容 |
|---|---|
| `/` | 首页：Hero / 我们做什么 / 品牌主张 / 18.9L 桶装水 / 办公与商务 / 10L 一次性 / 水源与品质 / 配送流程 / 廊坊本地 / 下单 CTA |
| `/products` | 产品与服务：18.9L 桶装水、10L 一次性桶装水 + 三项服务 |
| `/source` | 水源与品质：水源地、品质事实表、从水源到门口 |
| `/about` | 关于水邻居：品牌故事、事实表、母品牌背书 |
| `/contact` | 联系我们：电话、服务区域、地址、公众号、地图占位 |

## ⚠️ 合规红线（改文案前必读）

- 本品类为 **饮用天然水（GB 19298）**，全站**不得**把本品描述为「矿泉水」
- 「锶 / 偏硅酸」是 GB 8537 **饮用天然矿泉水**的界限指标，本项目无检测报告，**不得**作为本品卖点
- 「绿色食品认证」沿用母品牌既有公开表述，证书编号待补充
- 不使用「最便宜 / 第一 / 全网最低」等绝对化用语；不点名竞品
- CI 的 smoke test 会对 5 个页面做 `矿泉水` 断言，出现即失败

## 素材待补清单

- [ ] 品牌 logo（彩版 + 反白版，优先 SVG 或透明 PNG）→ 填 `site.ts` 的 `logo`
- [ ] 18.9L 桶装水产品图 → `public/` + `media.ts` 的 `product-bucket`
- [ ] 10L 一次性桶装水产品图 → 现用 `public/home/disposable-hero.jpg` 占位
- [ ] 水源地配图 → `media.ts` 的 `source-water`
- [ ] 公众号二维码 → `media.ts` 的 `wechat-qr`
- [ ] 门店地图 → `media.ts` 的 `map-placeholder`
- [ ] 品牌 slogan（现为 `TODO: REAL_SLOGAN`）
- [ ] ICP 备案号（`company.icp`）

## 发布与版本约定

`CHANGELOG.md` **完全由 semantic-release 维护，不要手工编辑**（新版本发布会把条目插到文件顶部）。
版本号规则（`.releaserc.json`）：

| commit type | 版本 | 说明 |
|---|---|---|
| `feat` | minor | 新功能 |
| `fix` `perf` `refactor` `revert` `infra` | patch | 修问题 / 重构 / 基础设施 |
| `docs` `chore` `ci` `style` `test` | **不发版** | 只改文档或流水线时不会出 tag |

约束：

- **不要手改 `package.json` 的 `version`**（由工具写）
- **commit message 不要带 `(vX.Y.Z)` 后缀**
- 发布流程：`git commit` → `git push origin main`，其余由 CI 完成

## 部署

见 `docs/deploy-lighthouse.md`。

**注意**：`/etc/caddy/Caddyfile` 是服务器级共享配置（同一台 Lighthouse 上还有美好水业站点块），
**归母站仓库 `meihao-water` 统一维护**，本仓库不包含它，也没有 caddy job。
