/**
 * 站点级常量。所有可变的「站点身份」信息统一在此。
 *
 * 注意：未知字段不要编造，使用 `TODO:` 占位字符串并通过渲染逻辑判断是否输出。
 *
 * ── 域名迁移预留 ────────────────────────────────────────────
 * 全站域名只在 `domain` / `url` 两处定义。后续从 linju.meihaowater.site
 * 迁到独立域名时，除这两行外还需同步：
 *   1. 服务器 Caddy 站点块的主机名列表（infra/Caddyfile，归「美好水业」仓库维护）
 *   2. .github/workflows/ci-cd.yml 与 rollback.yml 里的 smoke test URL 及内容断言
 *   3. 若做了微信站长认证，新域名的校验文件要放进 public/
 */

import { company } from "./company";

/** logo 资产配置。设计师出图前为 null，<Logo> 渲染中性占位而不是破图。 */
type LogoAssets = {
  /** 彩版，用于浅底（优先 SVG；次选透明 PNG） */
  color: string | null;
  /** 反白版，用于深底（页脚 / Navbar 深色态） */
  white: string | null;
  /** 彩版是否已含品牌名（true 时 <Logo> 不再叠加文字） */
  colorIsWordmark: boolean;
};

export const site = {
  name: "水邻居",
  legalName: company.legalName,
  domain: "linju.meihaowater.site",
  url: "https://linju.meihaowater.site",
  locale: "zh-CN",
  ogLocale: "zh_CN",
  description:
    "水邻居，美好水业旗下的新一代饮水生活品牌。主营 18.9L 桶装水与 10L 一次性桶装水，水源取自河北固安地下深层，廊坊本地配送。",
  shortDescription: "新一代饮水生活品牌",
  /** 页面 title 统一后缀（seo.ts / layout.tsx / opengraph-image.tsx 共用） */
  titleSuffix: "｜新一代饮水生活品牌",
  keywords: [
    "水邻居",
    "廊坊饮用水",
    "廊坊桶装水",
    "一次性桶装水",
    "10L桶装水",
    "桶装水配送",
    "美好水业",
  ] as string[],
  themeColor: "#0A2540",

  /** 母品牌信息：用于「美好水业旗下」背书与 JSON-LD 的 parentOrganization */
  parent: {
    name: "美好水业",
    legalName: company.legalName,
    url: "https://meihaowater.site",
    /** 母品牌经营年限（1998 年起） */
    years: "二十余年",
  },

  logo: {
    color: null,
    white: null,
    colorIsWordmark: false,
  } as LogoAssets,
} as const;

export type Site = typeof site;
