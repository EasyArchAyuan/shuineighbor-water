/**
 * 媒体清单（图片）。
 *
 * 重要约定：
 * - 真实图片未到位时，`src: null`，由 `<Figure>` 渲染中性占位块，
 *   并在 DOM 上标记 `data-placeholder="TODO: REPLACE_WITH_REAL_IMAGE"`。
 * - 替换时只改 `src` 字段，组件无需改动。
 * - `alt` 必须填写；无障碍要求。
 * - `ratio` 形如 "16/9" | "4/5" | "3/2" | "1/1" | "3/4"，用于 `aspect-ratio` CSS。
 *
 * 现状（2026-09-13）：沿用母站的中性场景图（无品牌字样）；品牌 logo 与产品实拍
 * 待素材到位后填入。素材来源计划见项目 README。
 */

export type MediaItem = {
  id: string;
  src: string | null;
  alt: string;
  ratio: `${number}/${number}`;
  /** 简短说明，用于设计师 / 替换者理解这张图的作用 */
  note: string;
  /** 替换为真实资源后改 false */
  todo: boolean;
};

export const media: Record<string, MediaItem> = {
  // ── 品牌资产（等设计师出图）──────────────────────────────
  "logo-color": {
    id: "logo-color",
    src: null,
    alt: "水邻居 logo",
    ratio: "1/1",
    note: "彩版 logo，用于浅底。建议 SVG 或透明 PNG；到位后同步 site.logo.color。",
    todo: true,
  },
  "logo-white": {
    id: "logo-white",
    src: null,
    alt: "水邻居（反白版）",
    ratio: "1/1",
    note: "反白版 logo，用于深底（页脚 / Navbar 深色态）。到位后同步 site.logo.white。",
    todo: true,
  },

  // ── 首页 Hero ───────────────────────────────────────────
  "hero-main": {
    id: "hero-main",
    src: "/hero/city-water.jpg",
    alt: "清晨的城市社区街景，前方一杯清水，路边停着载满桶装水的配送车",
    ratio: "4/5",
    note: "Hero 大图：水的通透感 + 城市生活感。移动端 4/5，>=640px 由调用方传 ratioSm=16/9。",
    todo: false,
  },

  // ── 产品（产品实拍待补）─────────────────────────────────
  "product-bucket": {
    id: "product-bucket",
    src: null,
    alt: "水邻居 18.9L 桶装水产品图",
    ratio: "3/2",
    note: "18.9L 桶装水产品主图，待产品实拍。",
    todo: true,
  },
  "product-disposable": {
    id: "product-disposable",
    src: "/home/disposable-hero.jpg",
    alt: "浅色渐变背景上的桶装水产品，四周大量留白",
    ratio: "16/9",
    note: "10L 一次性桶装水主视觉：产品单品，纯背景 + 强留白。",
    todo: false,
  },

  // ── 水源与品质 ──────────────────────────────────────────
  "source-water": {
    id: "source-water",
    src: null,
    alt: "河北固安水源地示意",
    ratio: "3/2",
    note: "水源地配图，待素材（现母站用的固安宣传图含母品牌元素，未沿用）。",
    todo: true,
  },

  // ── 场景图（沿用母站中性素材）───────────────────────────
  "whatwedo-01": {
    id: "whatwedo-01",
    src: "/home/whatwedo-01.jpg",
    alt: "家庭厨房里的饮水机与桶装水，晨光洒在台面上",
    ratio: "4/3",
    note: "使用场景 · 家庭饮水。",
    todo: false,
  },
  "whatwedo-02": {
    id: "whatwedo-02",
    src: "/home/whatwedo-02.jpg",
    alt: "办公室茶水间的饮水机与整齐摆放的白色水杯",
    ratio: "4/3",
    note: "使用场景 · 办公室饮水。",
    todo: false,
  },
  "whatwedo-03": {
    id: "whatwedo-03",
    src: "/home/whatwedo-03.jpg",
    alt: "会议室中为每位与会者备好的饮用水",
    ratio: "4/3",
    note: "使用场景 · 会议用水。",
    todo: false,
  },
  "whatwedo-04": {
    id: "whatwedo-04",
    src: "/home/whatwedo-04.jpg",
    alt: "整桶塑封的一次性桶装水特写",
    ratio: "4/3",
    note: "使用场景 · 一次性桶装水。",
    todo: false,
  },
  "home-life": {
    id: "home-life",
    src: "/home/home-life.jpg",
    alt: "家中客厅一角，饮水机旁的小桌上放着水杯与书",
    ratio: "4/5",
    note: "家庭场景主图：厨房 / 客厅 / 饮水机，暖光。",
    todo: false,
  },
  "office-space": {
    id: "office-space",
    src: "/home/office-space.jpg",
    alt: "可俯瞰城市天际线的现代办公空间与茶水区",
    ratio: "3/2",
    note: "办公与商务场景主图。",
    todo: false,
  },
  "brand-mood": {
    id: "brand-mood",
    src: "/home/shuineighbor.jpg",
    alt: "浅薄荷绿色的随身水壶置于明亮台面，旁有绿植与毛巾",
    ratio: "4/5",
    note: "品牌气质图：年轻 / 轻盈 / 低饱和蓝绿氛围。用于「更年轻」等特性表达。",
    todo: false,
  },

  // ── 占位（待补）────────────────────────────────────────
  "map-placeholder": {
    id: "map-placeholder",
    src: null,
    alt: "门店位置示意（待替换为真实地图）",
    ratio: "16/9",
    note: "/contact 页面地图占位。",
    todo: true,
  },
  "wechat-qr": {
    id: "wechat-qr",
    src: null,
    alt: "微信公众号「水邻居」二维码（待替换）",
    ratio: "1/1",
    note: "/contact 与结尾 CTA 共用：扫码关注公众号。",
    todo: true,
  },
};

export const getMedia = (id: string): MediaItem | undefined => media[id];
