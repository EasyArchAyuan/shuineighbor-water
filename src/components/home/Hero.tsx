import { ButtonLink } from "@/components/ui/ButtonLink";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { primaryPhone, company } from "@/data/company";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[var(--bg)]"
    >
      {/* 上半：标题区 */}
      <div className="container-site pt-28 pb-12 sm:pt-40 sm:pb-16 md:pt-52 md:pb-24">
        <Reveal className="flex flex-col items-center gap-6 text-center sm:gap-8">
          <RevealItem>
            <span className="eyebrow">
              {company.city} · {company.waterType}
            </span>
          </RevealItem>

          <RevealItem
            as="h1"
            id="hero-title"
            className="display-hero text-[var(--ink)]"
          >
            订水更简单，
            <br />
            喝水更轻松。
          </RevealItem>

          <RevealItem>
            <p className="body-lg max-w-xl text-[var(--ink-soft)]">
              水邻居，美好水业旗下的新一代饮水生活品牌。水源取自河北固安地下深层，
              {company.city}本地配送，18.9L 桶装水与 10L 一次性桶装水。
            </p>
          </RevealItem>

          <RevealItem as="div" className="w-full">
            <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <ButtonLink href={primaryPhone.tel} size="lg" fullWidthMobile>
                立即订水
              </ButtonLink>
              <ButtonLink
                href="/about"
                variant="secondary"
                size="lg"
                fullWidthMobile
              >
                了解水邻居
              </ButtonLink>
            </div>
          </RevealItem>
        </Reveal>
      </div>

      {/*
        下半：大图。移动端 4/5 竖构图（仅露出上半部分，诱导下滑）；≥640px 16/9 近满幅。
      */}
      <div className="container-wide pb-0">
        <Figure id="hero-main" ratio="4/5" ratioSm="16/9" priority />
      </div>
    </section>
  );
}
