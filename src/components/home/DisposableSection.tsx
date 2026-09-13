import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealItem, RevealOne } from "@/components/ui/Reveal";

export function DisposableSection() {
  return (
    <section
      aria-labelledby="disposable-title"
      className="bg-[var(--brand-deep)] text-[var(--on-dark)]"
    >
      <div className="container-wide section-y">
        <Reveal className="flex flex-col items-center gap-5 text-center sm:gap-6">
          <RevealItem>
            <span className="eyebrow !text-[var(--on-dark-soft)]">
              一次性桶装水 · 10L
            </span>
          </RevealItem>
          <RevealItem
            as="h2"
            id="disposable-title"
            className="display-section text-[var(--on-dark)]"
          >
            更轻，
            <br />
            更简单。
          </RevealItem>
          <RevealItem>
            <p className="body-lg max-w-xl text-[var(--on-dark-soft)]">
              10L 整桶塑封，用完即弃。不用归还，也不用清洗。
            </p>
          </RevealItem>
        </Reveal>

        <RevealOne className="mt-12 sm:mt-20">
          <div className="container-site">
            <Figure id="product-disposable" ratio="4/3" ratioSm="16/9" rounded />
          </div>
        </RevealOne>
      </div>
    </section>
  );
}
