## 1.0.0 (2026-09-13)

### 新功能

* **brand:** 接入官方品牌视觉规范 V1.0 ([387a548](https://github.com/EasyArchAyuan/shuineighbor-water/commit/387a548c5ffaea73c6650b3c05c1d2eec4d9709f))
* 水邻居独立官网上线内容与部署配置（v1.0.0） ([57a9590](https://github.com/EasyArchAyuan/shuineighbor-water/commit/57a959098cd059e5317f298d08a0d9ee9eb8a282))

# 变更记录

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

**自动化说明**：本文件由 semantic-release 维护。`feat` → minor、`fix`/`perf`/`refactor`/`infra` → patch，
`docs`/`chore`/`ci`/`test`/`style` 不触发发版。**不要手工修改版本号或插入条目**（历史手写条目保留即可）。

---

## [1.0.0] — 2026-09-13

水邻居独立官网上线。由母站仓库（[meihao-water](https://github.com/EasyArchAyuan/meihao-water)）克隆改造而来。

### 站点

- 5 页品牌站：首页 / 产品与服务 / 水源与品质 / 关于水邻居 / 联系我们
- 域名 `linju.meihaowater.site`（meihaowater.site 子域名，后续迁移独立域名）
- 与美好水业官网共用一台 Lighthouse 实例，独立站点目录、独立拉取脚本与 cron，互不影响

### 内容

- 产品收敛为主营两类：**18.9L 桶装水**、**10L 一次性桶装水**
- 新增 `/source`（水源与品质）与 `/about`（品牌故事 + 母品牌背书）
- 首页移除母站专属板块（二十年历程、水邻居子品牌段），新增品牌主张与水源摘要段
- 剥离「代理品牌」内容（属母品牌渠道生意）

### 合规

- 产品类别统一为「**饮用天然水（GB 19298）**」；全站移除「矿泉水」表述
- 移除「锶 / 偏硅酸」卖点表述（属 GB 8537 矿泉水界限指标，无检测报告不得使用）
- CI smoke test 增加 `矿泉水` 断言，5 个页面出现即失败

### 基础设施

- 部署沿用「服务器主动拉」：CI 构建 → `dist` 分支 → 服务器 cron 每 10 分钟拉取并原子切换
- `infra/shuineighbor-pull.sh`（站点目录 `/var/www/shuineighbor/out`）
- **Caddyfile 归母站仓库维护**（服务器级共享配置），本仓库不含 `infra/Caddyfile`、无 caddy job
- `deploy-site` composite action 的站点路径改为可传参（`site_path`）
- 默认服务器拉取模式无需任何 SSH Secret
