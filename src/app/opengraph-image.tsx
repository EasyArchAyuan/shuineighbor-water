import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}${site.titleSuffix}`;
export const dynamic = "force-static";
export const runtime = "nodejs";

/** 品牌色（与 globals.css 的 --accent / --accent-text 一致） */
const ACCENT_TEXT = "#17786f";
/** 品牌亮色 #63c9c1 的 20% 透明版，用于图标底 */
const ACCENT_SOFT = "rgba(99, 201, 193, 0.20)";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F7F8F5",
          padding: "80px",
          fontFamily: '"PingFang SC", "Noto Sans SC", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#0A1A2A",
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
              backgroundColor: ACCENT_SOFT,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32">
              <path
                d="M16 6 L16 26 M9 12 Q14 9 16 12 T23 12 M9 18 Q14 15 16 18 T23 18 M9 24 Q14 21 16 24 T23 24"
                stroke={ACCENT_TEXT}
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <span>{site.name}</span>
        </div>

        {/* 品牌定位语（已公开使用的原文，不自行创作 slogan） */}
        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            color: "#0A1A2A",
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
            color: "#4A545A",
            fontSize: 28,
            fontWeight: 400,
          }}
        >
          <span style={{ color: ACCENT_TEXT }}>更轻 · 更简单 · 更年轻</span>
          <span style={{ fontSize: 24 }}>{site.parent.name}旗下品牌</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
