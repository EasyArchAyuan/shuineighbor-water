/**
 * 公司与品牌事实。未知字段使用 `TODO: REAL_*` 占位字符串，
 * 渲染层（Footer / JSON-LD）需要判断 `value.startsWith("TODO:")` 决定是否输出。
 *
 * 品牌来源：水邻居是美好水业（廊坊市美好商贸有限公司）旗下自有品牌。
 *   法律实体：廊坊市美好商贸有限公司（2026-09-11 由「廊坊美好水业有限公司」变更）
 *   品牌创立：2020 年由美好水业自主研发
 *   订水电话：13393067179（主号） / 2805599 / 2232111
 *   公众号：水邻居
 *
 * ⚠️ 合规红线：本品牌产品法定类别为「饮用天然水」（GB 19298）。
 *    全站禁止把本品描述为「矿泉水」；「锶 / 偏硅酸」是 GB 8537 矿泉水
 *    的界限指标，无检测报告不得作为本品卖点。
 */

export const company = {
  legalName: "廊坊市美好商贸有限公司",
  brandName: "水邻居",
  /** 品牌定位语（已公开使用） */
  tagline: "新一代饮水生活品牌。",
  /** 品牌 slogan（取自官方《水邻居品牌视觉规范手册》V1.0 封面） */
  slogan: "简单生活·纯净相伴",
  /** 产品法定类别，全站统一引用此常量 */
  waterType: "饮用天然水",
  establishedYear: 2020,
  /** 2020 年由美好水业自主研发（源自品牌公开文案）；若实际年份不同请改此处 */
  yearsCopy: "六年",
  yearsPhrase: "自 2020 年起",
  city: "廊坊",
  /** 标准化后的地址：河北省廊坊市广阳区北凤道399号 */
  address: "河北省廊坊市广阳区北凤道399号",
  /** 原始地址（用户原话），保留备查 */
  rawAddress: "廊坊市北凤道399号",
  /** 配送范围（母品牌口径：廊坊本地） */
  serviceArea: "廊坊",
  phones: [
    {
      label: "手机号",
      number: "13393067179",
      display: "133 9306 7179",
      tel: "tel:+8613393067179",
      primary: true,
    },
    {
      label: "订水热线",
      number: "2805599",
      display: "2805599",
      tel: "tel:+8631642805599",
      primary: false,
    },
    {
      label: "订水热线",
      number: "2232111",
      display: "2232111",
      tel: "tel:+8631642232111",
      primary: false,
    },
  ] as const,
  wechatPublicName: "水邻居",
  wechatService: "TODO: REAL_WECHAT_ID",
  douyin: "TODO: REAL_DOUYIN_ACCOUNT",
  icp: "TODO: ICP备案完成后填写",
  copyrightYear: 2026,
} as const;

export type Company = typeof company;
export type Phone = (typeof company.phones)[number];

/** 判断字符串是否为 TODO 占位（用于渲染时跳过字段） */
export const isTodo = (v: string | undefined | null): boolean =>
  typeof v === "string" && v.startsWith("TODO:");

/** 取主订水电话 */
export const primaryPhone: Phone = company.phones.find((p) => p.primary) ?? company.phones[0];
