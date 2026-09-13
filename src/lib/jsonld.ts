/**
 * JSON-LD 结构化数据。
 * 关键原则：**仅输出真实字段**；未知字段整段省略，不填假值。
 * logo / slogan 等未确认字段依赖 TODO 占位判断，素材到位后自动生效。
 */

import { site } from "@/data/site";
import { company, primaryPhone, isTodo } from "@/data/company";

/** 母品牌（美好水业）—— 用于 parentOrganization 背书 */
const parentOrg = () => ({
  "@type": "Organization",
  name: site.parent.name,
  legalName: site.parent.legalName,
  url: site.parent.url,
});

/** Organization —— 站点身份 */
export function organizationJsonLd(): string {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brandName,
    legalName: company.legalName,
    url: site.url,
    parentOrganization: parentOrg(),
  };
  // 真实 slogan 才输出
  if (company.slogan && !isTodo(company.slogan)) {
    data.slogan = company.slogan;
  }
  // logo 素材到位才输出
  if (site.logo.color) {
    data.logo = new URL(site.logo.color, site.url).toString();
  }
  return JSON.stringify(data);
}

/** LocalBusiness —— 本地商家（仅当地址/电话等真实字段存在时输出） */
export function localBusinessJsonLd(): string {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": new URL("/#local-business", site.url).toString(),
    name: company.brandName,
    legalName: company.legalName,
    alternateName: site.parent.name,
    url: site.url,
    parentOrganization: parentOrg(),
    areaServed: { "@type": "City", name: `${company.city}市` },
  };
  // 真实电话才输出（schema.org telephone 用 E.164，不带 tel: 前缀）
  if (primaryPhone?.tel) {
    data.telephone = primaryPhone.tel.replace(/^tel:/, "");
  }
  // 真实地址才输出
  if (company.address && !isTodo(company.address)) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: `${company.city}市`,
      addressRegion: "河北省",
      addressCountry: "CN",
    };
  }
  // 品牌创立年份
  if (company.establishedYear) {
    data.foundingDate = String(company.establishedYear);
  }
  // 注：priceRange 已移除 —— 暂无对外报价，不提供未经验证的价格档位
  return JSON.stringify(data);
}
