/**
 * 自营产品。规格 / 价格 / 图片等未确认字段一律 `TODO: REAL_*`。
 * 真实数据补充时只改本文件，不动页面。
 *
 * 目前主营两类：
 *   1. 18.9L 桶装水（配饮水机，回收换桶）
 *   2. 10L 一次性桶装水（整桶塑封，不用归还）
 * 后续扩充品类时在此追加条目即可，页面按 `featured` 与 `category` 渲染。
 *
 * 价格：暂无对外报价，未在站内展示；需要时再加 `price` 字段。
 */

export type ProductCategory = "bucket" | "disposable" | "other";

export type Product = {
  id: string;
  name: string;
  /** 规格（容量） */
  volume: string;
  category: ProductCategory;
  /** 一句话卖点 */
  desc: string;
  /** 展开说明 */
  longDesc: string;
  /** 适用场景标签 */
  scenes: readonly string[];
  /** 是否作为主力产品重点展示 */
  featured: boolean;
  /** 对应 src/data/media.ts 里的图片 id */
  imageId: string;
};

export const products: readonly Product[] = [
  {
    id: "bucket-18-9l",
    name: "桶装水",
    volume: "18.9L",
    category: "bucket",
    desc: "家里和办公室最常喝的那一桶。",
    longDesc:
      "18.9L 标准桶装水，配饮水机使用，喝完回收换新桶。家庭、办公室、门店都合用，定期配送，不用惦记。",
    scenes: ["家庭", "办公室", "门店"],
    featured: true,
    imageId: "product-bucket",
  },
  {
    id: "disposable-10l",
    name: "一次性桶装水",
    volume: "10L",
    category: "disposable",
    desc: "不用归还，也不用清洗。",
    longDesc:
      "10L 一次性桶装水，整桶塑封，喝完即弃，没有押桶和清洗的麻烦。会议、接待、活动里最省事的一种。",
    scenes: ["会议", "接待", "活动"],
    featured: true,
    imageId: "product-disposable",
  },
] as const;
