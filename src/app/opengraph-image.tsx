import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Market Money HQ — Build Skills. Create Wealth. Live with Freedom!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 70% 55% at 75% 15%, rgba(0,136,255,0.35), transparent 55%), radial-gradient(ellipse 55% 45% at 10% 85%, rgba(0,102,214,0.25), transparent 50%), #000000",
          color: "#E8ECF0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Market Money HQ
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#4DB8FF",
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Build Skills. Create Wealth. Live with Freedom!
        </div>
        <div style={{ fontSize: 24, color: "#C8CDD5", maxWidth: 800 }}>
          Education & mentorship for trading, business, AI, and the digital
          economy
        </div>
      </div>
    ),
    { ...size }
  );
}
