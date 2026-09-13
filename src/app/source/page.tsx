import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Hairline } from "@/components/ui/Hairline";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { company } from "@/data/company";
import { site } from "@/data/site";

/**
 * 水源与品质。
 *
 * ⚠️ 合规红线（改动前必读）：
 *   - 本品类为「饮用天然水」（GB 19298），全页不得出现「矿泉水」表述；
 *   - 「锶 / 偏硅酸」是 GB 8537 饮用天然矿泉水的界限指标，本项目无检测报告，
 *     不得作为本品卖点；
 *   - 「绿色食品认证」沿用母品牌既有公开表述；证书编号与检测报告待补充后再细化。
 */

export const metadata: Metadata = buildMetadata({
  title: "水源与品质",
  description: `水邻居的水源地位于河北固安，取自地下深层，产品类别为${company.waterType}（GB 19298），主要面向${company.city}本地家庭与办公场景配送。`,
  path: "/source",
});

const quality = [
  { label: "产品类别", value: `${company.waterType}（GB 19298）` },
  { label: "认证", value: "绿色食品认证" },
  { label: "水源地", value: "河北固安 · 地下深层" },
];

const flow = [
  {
    index: "01",
    title: "取水",
    desc: "水源地位于河北固安，取自地下深层。",
  },
  {
    index: "02",
    title: "出品",
    desc: `2020 年起由${site.parent.name}自主研发推出，品牌一直在${company.city}本地。`,
  },
  {
    index: "03",
    title: "送到门口",
    desc: `依托${site.parent.name}${site.parent.years}积累的本地配送网络送达。`,
  },
];

export default function SourcePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-[var(--bg)] pt-16 sm:pt-[72px]">
        {/* Hero */}
        <section className="container-site section-y-sm">
          <Reveal className="max-w-3xl">
            <RevealItem>
              <span className="eyebrow">水源与品质</span>
            </RevealItem>
            <RevealItem as="h1" className="display-hero mt-6 text-[var(--ink)]">
              水从哪里来。
            </RevealItem>
            <RevealItem>
              <p className="body-lg mt-8 max-w-2xl text-[var(--ink-soft)]">
                水源地位于河北固安，取自地下深层。从取水到把水送到门口，这条水路一直在我们自己的体系里跑。
              </p>
            </RevealItem>
          </Reveal>
        </section>

        {/* 水源地 */}
        <section className="container-wide pb-16 sm:pb-24">
          <Reveal>
            <Figure id="source-water" ratio="4/3" ratioSm="16/9" rounded />
          </Reveal>
        </section>

        {/* 品质 */}
        <section className="bg-[var(--bg-alt)]">
          <div className="container-site section-y">
            <Reveal className="flex flex-col gap-6 sm:gap-8">
              <RevealItem>
                <span className="eyebrow">品质</span>
              </RevealItem>
              <RevealItem as="h2" className="display-section text-[var(--ink)]">
                该说清楚的，都写清楚。
              </RevealItem>
              <RevealItem as="div" className="w-full">
                <ul className="mt-2 flex flex-col">
                  {quality.map((q) => (
                    <li
                      key={q.label}
                      className="flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-4 last:border-b-0"
                    >
                      <span className="shrink-0 text-[13px] tracking-[0.12em] text-[var(--ink-muted)]">
                        {q.label}
                      </span>
                      <span className="text-right text-[16px] font-medium text-[var(--ink)] sm:text-[18px]">
                        {q.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
              <RevealItem>
                <p className="max-w-2xl text-[13px] leading-relaxed text-[var(--ink-muted)] sm:text-[14px]">
                  检测报告与证书编号可向门店索取，或致电
                  <a
                    href={company.phones[0].tel}
                    className="mx-1 tabular-nums text-[var(--accent-text)] underline-offset-4 hover:underline"
                  >
                    {company.phones[0].display}
                  </a>
                  查询。
                </p>
              </RevealItem>
            </Reveal>
          </div>
        </section>

        {/* 从水源到门口 */}
        <section className="bg-[var(--bg)]">
          <div className="container-wide section-y">
            <Reveal className="flex flex-col gap-8 sm:gap-10">
              <RevealItem>
                <span className="eyebrow">从水源到门口</span>
              </RevealItem>
              <RevealItem as="h2" className="display-section text-[var(--ink)]">
                三步，路不长。
              </RevealItem>
              <RevealItem>
                <Hairline />
              </RevealItem>
              <RevealItem as="div" className="w-full">
                <ul className="grid gap-8 sm:grid-cols-3 sm:gap-10">
                  {flow.map((s) => (
                    <li key={s.title} className="flex flex-col gap-3">
                      <span className="tabular-nums text-[10px] tracking-[0.24em] text-[var(--ink-muted)] sm:text-[11px]">
                        {s.index}
                      </span>
                      <h3 className="text-[20px] font-medium tracking-tight text-[var(--ink)] sm:text-[22px]">
                        {s.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
                        {s.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </Reveal>
          </div>
        </section>

        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
