import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { company } from "@/data/company";

/**
 * 水源与品质（首页摘要）。
 * ⚠️ 合规：本品类为「饮用天然水」（GB 19298），不写「矿泉水」；
 *    「锶 / 偏硅酸」属 GB 8537 矿泉水界限指标，无检测报告不得作为卖点。
 *    「绿色食品认证」沿用母品牌既有公开表述，证书编号待补充。
 */
const facts = [
  { label: "水源地", value: "河北固安 · 地下深层" },
  { label: "认证", value: "绿色食品认证" },
  { label: "产品类别", value: `${company.waterType}（GB 19298）` },
];

export function SourceSection() {
  return (
    <section aria-labelledby="source-title" className="bg-[var(--bg-alt)]">
      <div className="container-wide section-y">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
            <RevealItem>
              <span className="eyebrow">水源与品质</span>
            </RevealItem>
            <RevealItem
              as="h2"
              id="source-title"
              className="display-section text-[var(--ink)]"
            >
              水从哪里来。
            </RevealItem>
            <RevealItem>
              <p className="body-lg max-w-xl text-[var(--ink-soft)]">
                水源地位于河北固安，取自地下深层。从取水到把水送到门口，这条水路一直在我们自己的体系里跑。
              </p>
            </RevealItem>

            <RevealItem as="div" className="w-full">
              <ul className="flex flex-col">
                {facts.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-3.5 last:border-b-0"
                  >
                    <span className="text-[13px] tracking-[0.12em] text-[var(--ink-muted)]">
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
            <Figure id="source-water" ratio="4/3" ratioSm="3/2" rounded />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
