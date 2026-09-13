/**
 * 顶部主导航。首页由 Logo 承担入口，故不在此列。
 * 站点为 5 页品牌站：首页 / 产品与服务 / 水源与品质 / 关于水邻居 / 联系我们。
 */

export type NavItem = {
  label: string;
  href: string;
  /** 是否外链（用于决定 target / rel） */
  external?: boolean;
};

export const primaryNav: readonly NavItem[] = [
  { label: "产品与服务", href: "/products" },
  { label: "水源与品质", href: "/source" },
  { label: "关于水邻居", href: "/about" },
  { label: "联系我们", href: "/contact" },
] as const;
