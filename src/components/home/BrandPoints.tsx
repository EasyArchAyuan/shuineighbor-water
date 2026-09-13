import { Reveal, RevealItem } from "@/components/ui/Reveal";

/** 品牌三特性（取自水邻居既有公开文案，未自行创作） */
const points = [
  { index: "01", title: "更轻", desc: "一次性的便捷，不用归还，也不用清洗。" },
  { index: "02", title: "更简单", desc: "下单、付款、看配送，几步就完。" },
  { index: "03", title: "更年轻", desc: "清爽的样子，慢一点的节奏。" },
];

export function BrandPoints() {
  return (
    <section aria-labelledby="points-title" className="bg-[var(--bg)]">
      <div className="container-wide section-y">
        <Reveal className="flex flex-col items-center gap-5 text-center sm:gap-6">
          <RevealItem>
            <span className="eyebrow">品牌主张</span>
          </RevealItem>
          <RevealItem
            as="h2"
            id="points-title"
            className="display-section text-[var(--ink)]"
          >
            喝水的三件小事。
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-10">
          {points.map((p) => (
            <RevealItem
              as="li"
              key={p.title}
              className="border-t border-[var(--hairline-strong)] pt-6"
            >
              <span className="tabular-nums text-[10px] tracking-[0.24em] text-[var(--ink-muted)] sm:text-[11px]">
                {p.index}
              </span>
              <h3 className="mt-3 text-[24px] font-medium tracking-tight text-[var(--ink)] sm:text-[28px]">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-[16px]">
                {p.desc}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
