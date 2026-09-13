import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { company } from "@/data/company";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}${site.titleSuffix}`;
export const dynamic = "force-static";
export const runtime = "nodejs";

/** 品牌色（取自官方规范：主色 中蓝色 / 辅助色 浅绿色 / 背景色 暖白色） */
const BRAND = "#3d719f";
const BRAND_SOFT = "rgba(61, 113, 159, 0.12)";
const ACCENT_TEXT = "#4e7f58";
const BG = "#faf8f3";
const INK = "#1e2e3a";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          padding: "80px",
          fontFamily: '"PingFang SC", "Noto Sans SC", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: INK,
            fontSize: 32,
            fontWeight: 500,
          }}
        >
          {/* 一个抽象"水"标记（圆角矩形 + 内部波纹），配色取品牌辅助色 */}
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: BRAND_SOFT,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32">
              <path
                d="M16 6 L16 26 M9 12 Q14 9 16 12 T23 12 M9 18 Q14 15 16 18 T23 18 M9 24 Q14 21 16 24 T23 24"
                stroke={BRAND}
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <span>{site.name}</span>
        </div>

        {/* 品牌定位语（官方规范口径） */}
        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            color: INK,
            fontSize: 120,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: -3,
          }}
        >
          <span>新一代</span>
          <span>饮水生活品牌。</span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#4d5860",
            fontSize: 28,
            fontWeight: 400,
          }}
        >
          <span style={{ color: ACCENT_TEXT }}>{company.slogan}</span>
          <span style={{ fontSize: 24 }}>{site.parent.name}旗下品牌</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
