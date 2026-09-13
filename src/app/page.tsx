import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { BrandPoints } from "@/components/home/BrandPoints";
import { HomeWaterSection } from "@/components/home/HomeWaterSection";
import { OfficeSection } from "@/components/home/OfficeSection";
import { DisposableSection } from "@/components/home/DisposableSection";
import { SourceSection } from "@/components/home/SourceSection";
import { DeliveryFlow } from "@/components/home/DeliveryFlow";
import { CitySection } from "@/components/home/CitySection";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export const metadata: Metadata = buildMetadata({
  title: `${site.name}${site.titleSuffix}`,
  description: site.description,
  path: "/",
});

/**
 * 首页板块顺序
 *   1 Hero            品牌与主张
 *   2 WhatWeDo        我们做什么（家庭 / 办公室 / 会议 / 一次性）
 *   3 BrandPoints     品牌主张：更轻 · 更简单 · 更年轻
 *   4 HomeWater      18.9L 桶装水（家庭）
 *   5 OfficeWater    办公与商务用水
 *   6 Disposable      10L 一次性桶装水
 *   7 SourceSection   水源与品质（→ /source）
 *   8 DeliveryFlow    配送流程
 *   9 CitySection     廊坊本地 + 母品牌背书
 *  10 ClosingCTA      下单与联系
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <WhatWeDo />
        <BrandPoints />
        <HomeWaterSection />
        <OfficeSection />
        <DisposableSection />
        <SourceSection />
        <DeliveryFlow />
        <CitySection />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
