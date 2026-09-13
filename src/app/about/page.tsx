import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { company } from "@/data/company";
import { site } from "@/data/site";
import { products } from "@/data/products";

export const metadata: Metadata = buildMetadata({
  title: "关于水邻居",
  description: `水邻居是${site.parent.name}旗下的自有品牌，2020 年自主研发推出，水源取自河北固安地下深层，主营 18.9L 桶装水与 10L 一次性桶装水，${company.city}本地配送。`,
  path: "/about",
});

/** 品牌事实表（全部来自已确认信息） */
const facts = [
  { label: "品牌归属", value: `${site.parent.name}旗下自有品牌` },
  { label: "创立", value: "2020 年（自主研发推出）" },
  { label: "水源地", value: "河北固安 · 地下深层" },
  { label: "产品类别", value: `${company.waterType}（GB 19298）` },
  {
    label: "主营产品",
    value: products.map((p) => `${p.name} ${p.volume}`).join(" · "),
  },
  { label: "服务区域", value: `${company.city}本地` },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-[var(--bg)] pt-16 sm:pt-[72px]">
        {/* Hero */}
        <section className="container-site section-y-sm">
          <Reveal className="max-w-3xl">
            <RevealItem>
              <span className="eyebrow">关于水邻居</span>
            </RevealItem>
            <RevealItem as="h1" className="display-hero mt-6 text-[var(--ink)]">
              新一代，
              <br />
              饮水生活品牌。
            </RevealItem>
            <RevealItem>
              <p className="body-lg mt-8 max-w-2xl text-[var(--ink-soft)]">
                {company.city}人喝的水，我们想做得更简单一点。
              </p>
            </RevealItem>
          </Reveal>
        </section>

        {/* 品牌 */}
        <section className="container-wide pb-16 sm:pb-24">
          <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
              <RevealItem>
                <span className="eyebrow">品牌</span>
              </RevealItem>
              <RevealItem as="h2" className="display-section text-[var(--ink)]">
                2020 年，
                <br />
                从一支水开始。
              </RevealItem>
              <RevealItem>
                <p className="body-lg max-w-xl text-[var(--ink-soft)]">
                  水邻居是{site.parent.name}
                  的自有品牌，2020 年自主研发推出。水源在河北固安，配送在本地，
                  牌子也长在这座城里。
                </p>
              </RevealItem>
              <RevealItem as="div" className="w-full">
                <ul className="flex flex-col">
                  {facts.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-3.5 last:border-b-0"
                    >
                      <span className="shrink-0 text-[13px] tracking-[0.12em] text-[var(--ink-muted)]">
                        {f.label}
                      </span>
                      <span className="text-right text-[15px] font-medium text-[var(--ink)] sm:text-[16px]">
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
              <RevealItem>
                <Link
                  href="/source"
                  className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-[var(--accent-text)] underline-offset-4 transition-colors hover:underline"
                >
                  了解水源与品质
                  <span aria-hidden>→</span>
                </Link>
              </RevealItem>
            </Reveal>

            <Reveal className="lg:col-span-6">
              <Figure id="brand-mood" ratio="4/5" rounded />
            </Reveal>
          </div>
        </section>

        {/* 母品牌背书 */}
        <section className="bg-[var(--bg-alt)]">
          <div className="container-site section-y">
            <Reveal className="flex flex-col gap-6 sm:gap-8">
              <RevealItem>
                <span className="eyebrow">母品牌</span>
              </RevealItem>
              <RevealItem as="h2" className="display-section text-[var(--ink)]">
                身后是{site.parent.years}的水生意。
              </RevealItem>
              <RevealItem>
                <p className="body-lg max-w-2xl text-[var(--ink-soft)]">
                  {site.parent.name}自 1998 年起在{company.city}送水，
                  {site.parent.years}
                  攒下来的配送网络、仓储与客户，是水邻居做这支水时的底气。
                </p>
              </RevealItem>
              <RevealItem>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href={site.parent.url}
                    rel="noopener"
                    className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-[var(--accent-text)] underline-offset-4 transition-colors hover:underline"
                  >
                    访问{site.parent.name}官网
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-[var(--ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline"
                  >
                    看看产品
                    <span aria-hidden>→</span>
                  </Link>
                </div>
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
