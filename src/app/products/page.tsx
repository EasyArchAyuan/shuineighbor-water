import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Hairline } from "@/components/ui/Hairline";
import { products } from "@/data/products";
import { isTodo, company } from "@/data/company";

export const metadata: Metadata = buildMetadata({
  title: "产品与服务",
  description: `水邻居目前主营 18.9L 桶装水与 10L 一次性桶装水，${company.waterType}，${company.city}本地配送，家庭、办公室、会议与门店都合用。`,
  path: "/products",
});

/** 服务项目（取自既有公开表述，未新增承诺） */
const services = [
  { index: "01", title: "送水上门", desc: `${company.city}本地配送，家庭、办公室、门店都送。` },
  { index: "02", title: "定期配送", desc: "按周期送水，不用每次都惦记着下单。" },
  { index: "03", title: "回收换新", desc: "18.9L 桶喝完回收换新桶；一次性桶装水不用归还。" },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-[var(--bg)] pt-16 sm:pt-[72px]">
        {/* Hero */}
        <section className="container-site section-y-sm">
          <Reveal className="max-w-3xl">
            <RevealItem>
              <span className="eyebrow">产品与服务</span>
            </RevealItem>
            <RevealItem as="h1" className="display-hero mt-6 text-[var(--ink)]">
              要的水，
              <br />
              都在这里。
            </RevealItem>
            <RevealItem>
              <p className="body-lg mt-8 max-w-2xl text-[var(--ink-soft)]">
                目前是两种：18.9L 桶装水，和 10L 一次性桶装水。家庭、办公室、会议、门店，都够用。
              </p>
            </RevealItem>
          </Reveal>
        </section>

        {/* 产品 */}
        <section className="container-wide pb-16 sm:pb-24">
          <Reveal>
            <ul className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:gap-12">
              {products.map((p, i) => (
                <RevealItem as="li" key={p.id}>
                  <article className="flex h-full flex-col gap-5 border-t border-[var(--hairline-strong)] pt-6">
                    <Figure id={p.imageId} ratio="4/3" rounded />
                    <div className="flex items-baseline justify-between">
                      <span className="tabular-nums text-[12px] tracking-[0.24em] text-[var(--ink-muted)]">
                        0{i + 1}
                      </span>
                      {!isTodo(p.volume) ? (
                        <span className="text-[12px] tabular-nums text-[var(--ink-muted)]">
                          {p.volume}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="text-[22px] font-medium tracking-tight text-[var(--ink)] sm:text-[24px]">
                      {p.name}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {p.longDesc}
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
                      {p.scenes.map((s) => (
                        <li
                          key={s}
                          className="rounded-full bg-[var(--accent-tint)] px-3 py-1 text-[12px] text-[var(--accent-text)]"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealItem>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-10 sm:mt-14">
            <RevealItem>
              <p className="text-[14px] text-[var(--ink-muted)]">
                后续还会上更多品类，需要别的规格可以直接打
                <a
                  href={company.phones[0].tel}
                  className="ml-1 tabular-nums text-[var(--accent-text)] underline-offset-4 hover:underline"
                >
                  {company.phones[0].display}
                </a>
                问。
              </p>
            </RevealItem>
          </Reveal>
        </section>

        {/* 服务 */}
        <section className="bg-[var(--bg-alt)]">
          <div className="container-wide section-y">
            <Reveal className="flex flex-col gap-10">
              <RevealItem>
                <span className="eyebrow">服务</span>
              </RevealItem>
              <RevealItem>
                <h2 className="display-section text-[var(--ink)]">
                  订了，就有人送。
                </h2>
              </RevealItem>
              <RevealItem>
                <Hairline />
              </RevealItem>
              <RevealItem>
                <ul className="grid gap-8 sm:grid-cols-3 sm:gap-10">
                  {services.map((s) => (
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
              <RevealItem>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-[var(--accent-text)] underline-offset-4 transition-colors hover:underline"
                >
                  查看配送范围与联系方式
                  <span aria-hidden>→</span>
                </Link>
              </RevealItem>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
