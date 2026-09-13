import { cn } from "@/lib/cn";
import { site } from "@/data/site";

/**
 * Logo —— 品牌标识的唯一出口。
 *
 * 素材策略：设计师出图前 `site.logo.{color,white}` 为 null，
 * 此时渲染**中性文字标**（品牌名），不会出现破图，因此素材未到位也能上线。
 * 出图后只需在 `src/data/site.ts` 填入路径，本组件无需改动。
 *
 * 宽高比：不写死比例，用「固定高度 + width:auto」让图片按自身固有比例缩放，
 * 因此正方徽章、宽扁字标都适用（无需为特定 viewBox 计算宽度）。
 *
 * 占位 DOM 标记：data-placeholder="TODO: REPLACE_WITH_REAL_LOGO"
 */

type LogoProps = {
  /** color = 彩版（浅底用）；white = 反白版（深底用） */
  variant?: "color" | "white";
  className?: string;
  /** 高度（px） */
  height?: number;
  /** 仅 color 版生效：彩版不含品牌名时，是否在右侧补一行文字 */
  showText?: boolean;
};

export function Logo({
  variant = "color",
  className,
  height = 36,
  showText = true,
}: LogoProps) {
  const src = variant === "color" ? site.logo.color : site.logo.white;

  if (!src) {
    return (
      <span
        className={cn("inline-flex items-center", className)}
        style={{ height }}
        data-placeholder="TODO: REPLACE_WITH_REAL_LOGO"
      >
        <span
          className={cn(
            "text-[19px] font-medium tracking-tight",
            variant === "white" ? "text-[var(--on-dark)]" : "text-[var(--ink)]",
          )}
        >
          {site.name}
        </span>
      </span>
    );
  }

  const needsText = variant === "color" && showText && !site.logo.colorIsWordmark;

  return (
    <span
      className={cn("inline-flex items-center", needsText && "gap-2.5", className)}
      style={{ height }}
    >
      {/* 用原生 <img>：静态导出下 next/image 无法优化，且此处尺寸由 CSS 决定 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={site.name}
        className="block shrink-0 object-contain"
        style={{ height, width: "auto" }}
      />
      {needsText ? (
        <span className="text-[15px] font-medium tracking-tight text-[var(--ink)]">
          {site.name}
        </span>
      ) : null}
    </span>
  );
}
