import { CSSProperties, useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Lenis from "lenis";
import profilePhoto from "@/assets/profile.png";

/* ---------------------------------- data ---------------------------------- */

const EMAIL = "raunakd511@gmail.com";
const GITHUB = "https://github.com/shri-ram07";
const LINKEDIN = "https://www.linkedin.com/in/shri-ramd07/";
const RESUME_URL = "/assets/Shri_Ram_Dwivedi_Resume.pdf";

const INK = "#10233F";
const PAPER = "#EDEFF2";
const SHEET = "#F6F8FA";
const BLUE = "#2456C9";
const SKY = "#7FA3E8";
const RED = "#D8482B";
const GREEN = "#1D7A3F";
const ORANGE = "#E99648";

const mono = (w: number, s: string) => `${w} ${s} 'IBM Plex Mono'`;
const cond = (w: number, s: string) => `${w} ${s} 'Barlow Condensed'`;
const sans = (w: number, s: string) => `${w} ${s} 'Instrument Sans'`;

const HERO_ROWS: [string, number, number][][] = [
  [
    ["S", 0.55, -1], ["H", 0.8, 1], ["R", 0.35, -1], ["I", 1, 1],
    ["", 0, 0],
    ["R", 0.7, -1], ["A", 0.45, 1], ["M", 0.9, -1],
  ],
  [
    ["D", 0.6, 1], ["W", 1, -1], ["I", 0.4, 1], ["V", 0.75, -1],
    ["E", 0.5, 1], ["D", 0.95, -1], ["I", 0.3, 1],
  ],
];

/* ------------------------- project sheet visuals -------------------------- */
/* Coded stand-ins for product screenshots — one shared drafting style.
   `compact` (mobile sheets) hides secondary panels and stacks layouts. */

type VisualProps = { compact?: boolean };

const paperGrid: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(16,35,63,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(16,35,63,.04) 1px,transparent 1px)",
  backgroundSize: "22px 22px",
};

const cardShadow = "0 1px 0 rgba(16,35,63,.05), 0 10px 28px -14px rgba(16,35,63,.25)";

function PanelHeader({ left, right, dark }: { left: string; right: JSX.Element | string; dark?: boolean }) {
  return (
    <div style={{
      position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "9px 14px", borderBottom: `1px solid ${dark ? "rgba(127,163,232,.25)" : "rgba(16,35,63,.2)"}`,
      background: dark ? "transparent" : "#fff",
    }}>
      <span style={{ font: mono(600, "10.5px"), letterSpacing: ".1em", color: dark ? PAPER : INK }}>{left}</span>
      <span style={{ font: mono(500, "9.5px"), letterSpacing: ".07em", color: dark ? SKY : BLUE, display: "flex", alignItems: "center", gap: 6 }}>{right}</span>
    </div>
  );
}

function LiveDot({ label, color = GREEN }: { label: string; color?: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6, font: mono(500, "9.5px"), letterSpacing: ".06em", color }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {label}
    </span>
  );
}

function SpecRow({ k, v, i = 1 }: { k: string; v: string; i?: number }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", gap: 8, padding: "6px 8px",
      background: i % 2 ? "transparent" : "rgba(16,35,63,.035)",
      font: mono(500, "9.5px"), letterSpacing: ".04em",
    }}>
      <span style={{ color: "rgba(16,35,63,.55)" }}>{k}</span>
      <span style={{ color: INK, textAlign: "right" }}>{v}</span>
    </div>
  );
}

/* ---- Ryze: agent console ---- */

const SPARK = [48, 44, 46, 38, 40, 30, 33, 22, 25, 15, 18, 8];

function RyzeVisual({ compact }: VisualProps) {
  const sparkPts = SPARK.map((y, i) => `${(i * 300) / (SPARK.length - 1)},${y}`).join(" L");
  return (
    <div style={{ position: "absolute", inset: 0, background: "#EEF1F5", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PanelHeader left="RYZE_AGENT · ADS_SPECIALIST" right={<LiveDot label="LIVE · GCP_CLOUD_RUN" />} />
      <div style={{ position: "relative", flex: 1, display: "flex", minHeight: 0 }}>
        {/* sidebar */}
        <div style={{ flex: "0 0 30px", background: INK, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", gap: 10 }}>
          <span style={{ color: PAPER, font: sans(600, "13px") }}>✳</span>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ width: 9, height: 9, border: `1px solid rgba(237,239,242,${i === 1 ? ".9" : ".35"})`, background: i === 1 ? "rgba(237,239,242,.15)" : "transparent" }} />
          ))}
        </div>
        {/* chat */}
        <div style={{ flex: "1 1 58%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, minWidth: 0, padding: "10px 12px" }}>
          <div style={{ alignSelf: "flex-end", maxWidth: "82%", background: INK, color: PAPER, padding: "7px 11px", font: sans(400, "11px/1.45"), boxShadow: cardShadow }}>
            Launch a campaign to get more bookings this month.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 18, height: 18, background: BLUE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", font: mono(600, "10px") }}>R</span>
            <span style={{ font: mono(600, "9px"), letterSpacing: ".08em", color: INK }}>RYZE_AGENT</span>
            <span style={{ font: mono(400, "8.5px"), color: "rgba(16,35,63,.45)" }}>· 00:02</span>
          </div>
          <div style={{ background: "#fff", border: "1px solid rgba(16,35,63,.15)", boxShadow: cardShadow, padding: 12, display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <span style={{ font: mono(500, "8.5px"), letterSpacing: ".1em", color: BLUE }}>CAMPAIGN_SETUP — VELVET STUDIO · MARCH</span>
              <span style={{ font: mono(600, "8px"), letterSpacing: ".08em", color: GREEN, border: `1px solid ${GREEN}`, padding: "2px 6px" }}>READY</span>
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              {[["$85", "DAILY_BUDGET"], ["840", "EST_CLICKS/MO"], ["42–58", "EST_BOOKINGS"]].map(([v, k]) => (
                <div key={k} style={{ flex: 1, minWidth: 0, borderLeft: `2px solid ${BLUE}`, background: "rgba(36,86,201,.06)", padding: "7px 9px" }}>
                  <div style={{ font: cond(600, "clamp(15px,1.8vw,24px)"), color: INK }}>{v}</div>
                  <div style={{ font: mono(500, "7.5px"), letterSpacing: ".07em", color: "rgba(16,35,63,.55)", whiteSpace: "nowrap" }}>{k}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", font: mono(500, "8px"), letterSpacing: ".08em", color: "rgba(16,35,63,.55)", marginBottom: 3 }}>
                <span>CLICKS — LAST 28D</span>
                <span style={{ color: GREEN }}>↗ +34%</span>
              </div>
              <svg viewBox="0 0 300 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 42 }}>
                <path d={`M${sparkPts} L300,60 L0,60 Z`} fill="rgba(36,86,201,.12)" />
                <path d={`M${sparkPts}`} fill="none" stroke={BLUE} strokeWidth="1.8" />
                <circle cx="300" cy="8" r="2.6" fill={BLUE} />
              </svg>
            </div>
            {!compact && (
              <div>
                <SpecRow k="PLATFORMS" v="GOOGLE SEARCH + META" i={0} />
                <SpecRow k="RADIUS" v="15 MI — SCOTTSDALE, AZ" />
                <SpecRow k="SCHEDULE" v="MON—SAT · 7AM—9PM" i={0} />
                <SpecRow k="BIDDING" v="MAXIMIZE_CONVERSIONS" />
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid rgba(16,35,63,.15)", padding: "7px 10px" }}>
            <span style={{ flex: 1, font: sans(400, "10.5px"), color: "rgba(16,35,63,.4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Ask Ryze anything about your ads…
            </span>
            <span style={{ width: 18, height: 18, background: INK, color: PAPER, display: "flex", alignItems: "center", justifyContent: "center", font: sans(500, "10px") }}>→</span>
          </div>
        </div>
        {/* orchestration rail */}
        {!compact && (
          <div style={{ flex: "0 0 31%", borderLeft: "1px solid rgba(16,35,63,.15)", padding: "12px 12px", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
            <span style={{ font: mono(500, "8.5px"), letterSpacing: ".12em", color: "rgba(16,35,63,.55)", marginBottom: 8 }}>ORCHESTRATION</span>
            <div style={{ background: INK, color: PAPER, textAlign: "center", padding: "7px 8px", font: mono(600, "9.5px"), letterSpacing: ".08em", boxShadow: cardShadow }}>GEMINI_LLM</div>
            <div className="bp-flow" style={{ alignSelf: "center", width: 2, height: 16 }} />
            <div style={{ background: "#fff", color: BLUE, textAlign: "center", padding: "7px 8px", font: mono(600, "9.5px"), letterSpacing: ".08em", border: `1px solid ${BLUE}` }}>MCP_SERVERS</div>
            <div className="bp-flow" style={{ alignSelf: "center", width: 2, height: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["GOOGLE_ADS_API", "META_ADS_API", "ANALYTICS_API"].map((t) => (
                <div key={t} style={{ background: "#fff", border: "1px solid rgba(16,35,63,.2)", borderLeft: `2px solid ${BLUE}`, padding: "6px 8px", font: mono(500, "9px"), letterSpacing: ".06em", color: INK }}>
                  {t}
                </div>
              ))}
            </div>
            <span style={{ marginTop: 10, font: mono(500, "8.5px"), letterSpacing: ".1em", color: RED }}>AUTONOMOUS_LOOP · 24/7</span>
            <span style={{ marginTop: 6, font: mono(500, "8px"), letterSpacing: ".08em", color: "rgba(16,35,63,.4)" }}>FIG.01A — AGENT CONSOLE, REDRAWN</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Chronicle: research run ---- */

const PHASES = ["SCOPE", "PLAN", "SEARCH", "READ", "VERIFY", "SYNTH", "DRAFT", "SHIP"];
const LOG_LINES: [string, string, string][] = [
  ["12:04:11", "SEARCH 41/75", '"cursor enterprise pricing"'],
  ["12:04:13", "READ", "3 sources · 12k tokens"],
  ["12:04:17", "VERIFY ✓", "claim x-checked (2 src)"],
  ["12:04:21", "SEARCH 42/75", '"copilot seat growth"'],
  ["12:04:24", "SYNTH", "drafting §2.3"],
  ["12:04:26", "SELF_CORRECT", "re-running §2.1"],
];

function TextLine({ w, tint }: { w: number; tint?: boolean }) {
  return <div style={{ height: 5, width: `${w}%`, background: tint ? "rgba(36,86,201,.25)" : "rgba(16,35,63,.13)" }} />;
}

function ChronicleVisual({ compact }: VisualProps) {
  const done = 6;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#EEF1F5", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PanelHeader left="CHRONICLE · RESEARCH_RUN_004" right="75+ TARGETED_SEARCHES · LIVE_WEB" />
      {/* pipeline strip */}
      <div style={{ position: "relative", padding: "14px 16px 8px", background: "#fff", borderBottom: "1px solid rgba(16,35,63,.15)" }}>
        <div style={{ position: "absolute", left: 28, right: 28, top: 25, height: 2, background: "rgba(16,35,63,.12)" }} />
        <div style={{ position: "absolute", left: 28, width: `calc((100% - 56px) * ${(done - 1) / (PHASES.length - 1)})`, top: 25, height: 2, background: BLUE }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
          {PHASES.map((p, i) => (
            <div key={p} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 34 }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                font: mono(600, "8px"),
                background: i < done - 1 ? BLUE : i === done - 1 ? RED : "#fff",
                color: i < done ? "#fff" : "rgba(16,35,63,.5)",
                border: `1.5px solid ${i < done - 1 ? BLUE : i === done - 1 ? RED : "rgba(16,35,63,.3)"}`,
                boxShadow: i === done - 1 ? "0 0 0 3px rgba(216,72,43,.15)" : undefined,
              }}>
                {i < done - 1 ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              {!compact && <span style={{ font: mono(500, "7.5px"), letterSpacing: ".05em", color: i === done - 1 ? RED : "rgba(16,35,63,.55)" }}>{p}</span>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", flex: 1, display: "flex", gap: 12, padding: 12, minHeight: 0 }}>
        {/* report page */}
        <div style={{ flex: "1.4 1 0", background: "#fff", border: "1px solid rgba(16,35,63,.15)", boxShadow: cardShadow, padding: "13px 14px", display: "flex", flexDirection: "column", gap: 7, minWidth: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <span style={{ font: mono(500, "8px"), letterSpacing: ".08em", color: "rgba(16,35,63,.5)" }}>REPORT_004.PDF · 24 PAGES</span>
            <span style={{ display: "flex", gap: 4 }}>
              {["PDF", "MD", "SLIDES"].map((f) => (
                <span key={f} style={{ font: mono(500, "7.5px"), border: "1px solid rgba(16,35,63,.25)", padding: "1px 5px", color: "rgba(16,35,63,.65)" }}>{f}</span>
              ))}
            </span>
          </div>
          <span style={{ font: cond(600, "clamp(14px,1.6vw,20px)/1.1"), textTransform: "uppercase", color: INK }}>Market landscape — AI coding agents</span>
          <span style={{ font: mono(500, "7.5px"), letterSpacing: ".12em", color: BLUE }}>01 — EXECUTIVE_SUMMARY</span>
          <TextLine w={96} /><TextLine w={88} /><TextLine w={62} />
          <span style={{ font: mono(500, "7.5px"), letterSpacing: ".12em", color: BLUE, marginTop: 2 }}>FIG_01 — ADOPTION BY SEGMENT</span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 44, borderBottom: "1px solid rgba(16,35,63,.25)", paddingBottom: 0 }}>
            {[62, 88, 41, 100, 74, 30].map((h, i) => (
              <span key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? BLUE : "rgba(36,86,201,.3)" }} />
            ))}
          </div>
          <span style={{ font: mono(500, "7.5px"), letterSpacing: ".12em", color: BLUE, marginTop: 2 }}>02 — COMPETITIVE_MATRIX</span>
          <TextLine w={92} /><TextLine w={70} tint /><TextLine w={84} />
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", font: mono(500, "7.5px"), letterSpacing: ".07em", color: "rgba(16,35,63,.45)" }}>
            <span>SOURCES — 75+ · CITED_INLINE</span>
            <span>p.03</span>
          </div>
        </div>
        {/* live activity log */}
        {!compact && (
          <div style={{ flex: "1 1 0", background: INK, padding: "11px 12px", display: "flex", flexDirection: "column", gap: 6, minWidth: 0, overflow: "hidden", boxShadow: cardShadow }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ font: mono(600, "8.5px"), letterSpacing: ".12em", color: SKY }}>ACTIVITY_LOG</span>
              <LiveDot label="RUNNING" color="#4CAF6E" />
            </div>
            {LOG_LINES.map(([t, tag, rest], i) => (
              <div key={i} style={{ display: "flex", gap: 7, font: mono(400, "8.5px"), letterSpacing: ".02em", whiteSpace: "nowrap", overflow: "hidden" }}>
                <span style={{ color: "rgba(237,239,242,.35)" }}>{t}</span>
                <span style={{ color: tag.startsWith("SELF") ? RED : tag.startsWith("VERIFY") ? "#4CAF6E" : SKY, flexShrink: 0 }}>{tag}</span>
                <span style={{ color: "rgba(237,239,242,.6)", overflow: "hidden", textOverflow: "ellipsis" }}>{rest}</span>
              </div>
            ))}
            <span className="bp-caret" style={{ font: mono(400, "8.5px"), color: "rgba(237,239,242,.7)" }}>▌</span>
            <span style={{ marginTop: "auto", font: mono(500, "7.5px"), letterSpacing: ".08em", color: "rgba(237,239,242,.35)" }}>
              1 GOAL → 8 PHASES → N FORMATS
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- NeuroInsight: MRI viewer ---- */

function wavyEllipse(cx: number, cy: number, rx: number, ry: number, n: number, amp: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const f = 1 + (i % 2 ? -amp : amp);
    pts.push([cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f]);
  }
  const mid = (p: [number, number], q: [number, number]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M${mid(pts[0], pts[1]).map((v) => v.toFixed(1)).join(" ")}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n];
    const m = mid(p, pts[(i + 1) % n]);
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return d + " Z";
}

const BRAIN = wavyEllipse(210, 150, 108, 86, 30, 0.05);
const BRAIN_INNER = wavyEllipse(210, 150, 96, 75, 26, 0.04);

const SULCI = [
  "M156 96 C168 106 166 120 154 127",
  "M136 138 C150 144 152 158 140 167",
  "M152 196 C164 190 176 196 181 208",
  "M178 108 C188 118 186 132 176 139",
  "M264 96 C252 106 254 120 266 127",
  "M284 138 C270 144 268 158 280 167",
  "M268 196 C256 190 244 196 239 208",
  "M242 108 C232 118 234 132 244 139",
];

function NeuroVisual({ compact }: VisualProps) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0A1424", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PanelHeader dark left="NEUROINSIGHT_VIEWER · AXIAL" right="SLICE 077/155 · T1CE" />
      <div style={{ position: "relative", flex: 1, display: "flex", minHeight: 0 }}>
        <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <svg viewBox="0 0 420 300" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <radialGradient id="nglow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#18274A" />
                <stop offset="100%" stopColor="#0A1424" />
              </radialGradient>
              <radialGradient id="tcore" cx="45%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#F0765B" />
                <stop offset="100%" stopColor="#B93A20" />
              </radialGradient>
            </defs>
            <ellipse cx="210" cy="150" rx="185" ry="140" fill="url(#nglow)" />
            <line x1="0" y1="150" x2="420" y2="150" stroke="rgba(127,163,232,.12)" strokeWidth="1" />
            <line x1="210" y1="0" x2="210" y2="300" stroke="rgba(127,163,232,.12)" strokeWidth="1" />
            {/* skull */}
            <ellipse cx="210" cy="150" rx="132" ry="112" fill="none" stroke="#E4E7EE" strokeWidth="3" />
            <ellipse cx="210" cy="150" rx="124" ry="104" fill="rgba(127,163,232,.05)" stroke="rgba(237,239,242,.3)" strokeWidth="1" />
            {/* cortex with gyri */}
            <path d={BRAIN} fill="rgba(127,163,232,.1)" stroke="rgba(159,186,235,.75)" strokeWidth="1.4" />
            <path d={BRAIN_INNER} fill="none" stroke="rgba(127,163,232,.3)" strokeWidth="1" />
            {/* longitudinal fissure */}
            <path d="M210 66 C207 96 213 124 209 150 C213 180 207 210 210 234" fill="none" stroke="rgba(127,163,232,.5)" strokeWidth="1.2" />
            {SULCI.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="rgba(127,163,232,.4)" strokeWidth="1" />
            ))}
            {/* ventricles */}
            <path d="M198 136 C190 145 191 161 199 170 C202 163 202 145 198 136 Z" fill="rgba(174,196,240,.5)" />
            <path d="M222 136 C230 145 229 161 221 170 C218 163 218 145 222 136 Z" fill="rgba(174,196,240,.5)" />
            <line x1="210" y1="152" x2="210" y2="164" stroke="rgba(174,196,240,.5)" strokeWidth="2" />
            {/* edema + tumor */}
            <path d="M248 158 C270 146 298 154 308 174 C318 194 306 218 284 224 C262 230 244 214 246 192 C247 180 242 166 248 158 Z"
              fill="rgba(233,150,72,.18)" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" />
            <path d="M264 176 C278 170 294 178 298 190 C302 203 292 215 279 217 C265 219 255 209 256 196 C257 187 257 181 264 176 Z"
              fill="url(#tcore)" stroke={RED} strokeWidth="1.5" />
            <rect x="240" y="152" width="76" height="78" fill="none" stroke={RED} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="316" y1="152" x2="352" y2="118" stroke={RED} strokeWidth="1" />
            <text x="290" y="112" fill={RED} style={{ font: mono(500, "9px"), letterSpacing: ".08em" }}>TUMOR_ROI</text>
            <text x="300" y="243" fill={ORANGE} style={{ font: mono(500, "8px"), letterSpacing: ".08em" }}>EDEMA</text>
            {/* orientation + scale */}
            <text x="52" y="155" fill="rgba(237,239,242,.35)" style={{ font: mono(500, "10px") }}>R</text>
            <text x="362" y="155" fill="rgba(237,239,242,.35)" style={{ font: mono(500, "10px") }}>L</text>
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={26 + i * 18} y1="286" x2={26 + i * 18} y2={i % 2 ? 281 : 278} stroke="rgba(237,239,242,.45)" strokeWidth="1" />
            ))}
            <text x="26" y="272" fill="rgba(237,239,242,.45)" style={{ font: mono(500, "7.5px") }}>0 — 40MM</text>
          </svg>
        </div>
        {/* plane thumbnails + colorbar */}
        {!compact && (
          <div style={{ flex: "0 0 72px", borderLeft: "1px solid rgba(127,163,232,.2)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "10px 0" }}>
            {["AX", "COR", "SAG"].map((p, i) => (
              <div key={p} style={{ width: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <svg viewBox="0 0 50 38" style={{ width: 50, height: 38, background: "#10233F", border: `1px solid ${i === 0 ? SKY : "rgba(127,163,232,.25)"}` }}>
                  {i === 0 && <ellipse cx="25" cy="19" rx="16" ry="12" fill="none" stroke="rgba(159,186,235,.7)" strokeWidth="1" />}
                  {i === 1 && <path d="M11 27 C11 13 18 7 25 7 C32 7 39 13 39 27 Z" fill="none" stroke="rgba(159,186,235,.5)" strokeWidth="1" />}
                  {i === 2 && <path d="M13 26 C10 14 20 6 30 8 C38 10 41 20 36 26 Z" fill="none" stroke="rgba(159,186,235,.5)" strokeWidth="1" />}
                  {i === 0 && <circle cx="33" cy="23" r="3.5" fill="rgba(216,72,43,.8)" />}
                </svg>
                <span style={{ font: mono(500, "7.5px"), letterSpacing: ".08em", color: i === 0 ? SKY : "rgba(237,239,242,.4)" }}>{p}</span>
              </div>
            ))}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minHeight: 40 }}>
              <span style={{ font: mono(500, "7px"), color: "rgba(237,239,242,.45)" }}>1.0</span>
              <span style={{ flex: 1, width: 9, background: "linear-gradient(180deg,#EDEFF2,#7FA3E8,#233B66,#0A1424)", border: "1px solid rgba(127,163,232,.3)" }} />
              <span style={{ font: mono(500, "7px"), color: "rgba(237,239,242,.45)" }}>0.0</span>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "8px 14px", borderTop: "1px solid rgba(127,163,232,.25)" }}>
        <span style={{ font: mono(500, "9px"), letterSpacing: ".08em", color: PAPER }}>DICE — 0.91</span>
        <span style={{ flex: 1, maxWidth: 150, height: 3, background: "rgba(127,163,232,.2)" }}>
          <span style={{ display: "block", width: "91%", height: "100%", background: SKY }} />
        </span>
        {!compact && <span style={{ font: mono(500, "9px"), letterSpacing: ".08em", color: "rgba(237,239,242,.55)" }}>VOL 12.4 CM³</span>}
        <span style={{ font: mono(500, "9px"), letterSpacing: ".08em", color: "rgba(237,239,242,.55)" }}>3D U-NET · BRATS</span>
      </div>
    </div>
  );
}

/* ---- DeepFake: forensics ---- */

const F = {
  jaw: [[58, 118], [56, 146], [60, 176], [70, 202], [86, 222], [110, 232], [134, 222], [150, 202], [160, 176], [164, 146], [162, 118]],
  browL: [[70, 110], [80, 104], [92, 104], [102, 109]],
  browR: [[118, 109], [128, 104], [140, 104], [150, 110]],
  eyeL: [[76, 126], [83, 121], [93, 121], [100, 126], [93, 131], [83, 131], [76, 126]],
  eyeR: [[120, 126], [127, 121], [137, 121], [144, 126], [137, 131], [127, 131], [120, 126]],
  nose: [[110, 118], [110, 134], [110, 150], [98, 160], [104, 165], [110, 167], [116, 165], [122, 160]],
  lips: [[90, 194], [100, 188], [110, 186], [120, 188], [130, 194], [120, 201], [110, 203], [100, 201], [90, 194]],
  forehead: [[76, 92], [93, 80], [110, 76], [127, 80], [144, 92]],
} as const;

const CROSS: [readonly [number, number], readonly [number, number]][] = [
  [F.browL[1], F.eyeL[1]], [F.browL[2], F.eyeL[2]],
  [F.browR[1], F.eyeR[1]], [F.browR[2], F.eyeR[2]],
  [F.eyeL[0], F.jaw[1]], [F.eyeR[3], F.jaw[9]],
  [F.eyeL[3], F.nose[1]], [F.eyeR[0], F.nose[1]],
  [F.nose[3], F.lips[0]], [F.nose[7], F.lips[4]],
  [F.nose[5], F.lips[2]],
  [F.jaw[3], F.lips[0]], [F.jaw[7], F.lips[4]],
  [F.jaw[5], F.lips[6]],
  [F.forehead[0], F.browL[0]], [F.forehead[4], F.browR[3]],
  [F.forehead[2], F.nose[0]],
  [F.forehead[1], F.browL[2]], [F.forehead[3], F.browR[1]],
  [F.jaw[0], F.browL[0]], [F.jaw[10], F.browR[3]],
];

const REGIONS: [string, number][] = [
  ["EYES", 98], ["MOUTH", 96], ["SKIN_TEXTURE", 95], ["EDGE_ARTIFACTS", 97],
];

function DeepfakeVisual({ compact }: VisualProps) {
  const groups = Object.values(F) as unknown as [number, number][][];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#EEF1F5", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PanelHeader left="DEEPFAKE_DETECTOR · CNN" right="INPUT — FACE_0192.JPG" />
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: compact ? "column" : "row", minHeight: 0 }}>
        <div style={{ position: "relative", flex: compact ? "1 1 48%" : "1 1 46%", borderRight: compact ? undefined : "1px solid rgba(16,35,63,.15)", borderBottom: compact ? "1px solid rgba(16,35,63,.15)" : undefined, minWidth: 0, minHeight: 0, overflow: "hidden", background: "#fff" }}>
          <svg viewBox="0 0 220 280" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d="M110 62 C148 62 168 94 166 138 C164 178 146 214 110 234 C74 214 56 178 54 138 C52 94 72 62 110 62 Z"
              fill="rgba(36,86,201,.05)" stroke={INK} strokeWidth="1.6" />
            {CROSS.map(([a, b], i) => (
              <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(36,86,201,.3)" strokeWidth=".7" />
            ))}
            {groups.map((pts, gi) => (
              <polyline key={gi} points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="rgba(36,86,201,.55)" strokeWidth="1" />
            ))}
            {groups.flat().map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.8" fill={BLUE} />
            ))}
          </svg>
          <div className="df-scan" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: RED, opacity: 0.65, boxShadow: "0 0 8px rgba(216,72,43,.5)" }} />
          <span style={{ position: "absolute", bottom: 6, left: 10, font: mono(500, "8px"), letterSpacing: ".1em", color: "rgba(16,35,63,.45)" }}>
            LANDMARKS — 52 · MESH_OK
          </span>
        </div>
        <div style={{ position: "relative", flex: "1 1 54%", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, minWidth: 0, minHeight: 0 }}>
          <span style={{ font: mono(600, "9.5px"), letterSpacing: ".1em", color: INK }}>FORENSIC_READOUT</span>
          <div style={{ border: `1px solid ${GREEN}`, background: "#fff", boxShadow: cardShadow, padding: "8px 12px", display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ font: cond(600, "clamp(20px,2.6vw,30px)"), color: GREEN }}>REAL</span>
            <span style={{ font: mono(500, "10px"), color: GREEN }}>P=0.97</span>
            <span style={{ marginLeft: "auto", font: mono(500, "8px"), letterSpacing: ".06em", color: "rgba(16,35,63,.45)" }}>84MS</span>
          </div>
          {([["REAL", 97, GREEN], ["FAKE", 3, RED]] as [string, number, string][]).map(([k, v, c]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ font: mono(500, "8.5px"), width: 32, color: INK }}>{k}</span>
              <span style={{ flex: 1, height: 6, background: "rgba(16,35,63,.08)" }}>
                <span style={{ display: "block", width: `${v}%`, height: "100%", background: c }} />
              </span>
              <span style={{ font: mono(500, "8.5px"), color: "rgba(16,35,63,.55)" }}>.{String(v).padStart(2, "0")}</span>
            </div>
          ))}
          {!compact && (
            <div style={{ border: "1px solid rgba(16,35,63,.15)", background: "#fff" }}>
              {REGIONS.map(([k, v], i) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 9px", background: i % 2 ? "rgba(16,35,63,.03)" : "transparent" }}>
                  <span style={{ font: mono(500, "8.5px"), color: "rgba(16,35,63,.6)", width: 96 }}>{k}</span>
                  <span style={{ flex: 1, height: 4, background: "rgba(16,35,63,.08)" }}>
                    <span style={{ display: "block", width: `${v}%`, height: "100%", background: "rgba(36,86,201,.65)" }} />
                  </span>
                  <span style={{ font: mono(500, "8.5px"), color: INK }}>.{v}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ font: mono(500, "8px"), letterSpacing: ".1em", color: "rgba(16,35,63,.5)" }}>FIG.04A — ARTIFACT_ATTENTION_MAP</span>
              <span style={{ font: mono(500, "7.5px"), color: "rgba(16,35,63,.45)" }}>LOW ▁▄█ HIGH</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                [0.1, 0.2, 0.14, 0.32, 0.2, 0.12, 0.26, 0.1],
                [0.18, 0.42, 0.3, 0.55, 0.68, 0.35, 0.16, 0.22],
                [0.08, 0.25, 0.5, 0.3, 0.4, 0.24, 0.3, 0.09],
              ].map((row, ri) => (
                <div key={ri} style={{ display: "flex", gap: 3 }}>
                  {row.map((o, i) => (
                    <span key={i} style={{ flex: 1, height: 9, background: ri === 1 && i === 4 ? `rgba(216,72,43,${o})` : `rgba(36,86,201,${o})` }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- scene data ------------------------------- */

const SCENES = [
  {
    n: "01", fig: "FIG.01 — AGENTIC PIPELINE", title: "Ryze AI — Ads Specialist Agent",
    role: "FOUNDING AI ENGINEER · JUN 2025 — JUL 2026",
    result: "End-to-end agentic pipeline for autonomous campaign optimization — Google Gemini orchestrated against Google Ads, Meta Ads and Analytics APIs, scaled to 1,000+ concurrent users on GCP.",
    chips: ["GEMINI", "MCP", "FASTAPI", "OAUTH2", "GCP"],
    side: -1, repo: null as string | null, Visual: RyzeVisual,
  },
  {
    n: "02", fig: "FIG.02 — AGENT ORCHESTRATION", title: "Chronicle — Research Agent",
    role: "SOLO BUILD · JAN — FEB 2026",
    result: "Turns a single research goal into deeply-analyzed, multi-format reports — a self-correcting 8-phase pipeline executing 75+ targeted searches with real-time web grounding.",
    chips: ["GEMINI API", "WEB GROUNDING", "AGENTS"],
    side: 1, repo: "https://github.com/shri-ram07/Chronicle.git", Visual: ChronicleVisual,
  },
  {
    n: "03", fig: "FIG.03 — VOLUMETRIC CV", title: "NeuroInsight — 3D Tumor Segmentation",
    role: "SOLO BUILD · AUG — NOV 2025",
    result: "A 3D U-Net that segments brain tumors and detects regions of interest in volumetric MRI — high Dice similarity scores on the BraTS benchmark.",
    chips: ["TENSORFLOW", "3D U-NET", "BRATS"],
    side: -1, repo: "https://github.com/shri-ram07/NeuroInsight.git", Visual: NeuroVisual,
  },
  {
    n: "04", fig: "FIG.04 — IMAGE FORENSICS", title: "DeepFake Detector",
    role: "SOLO BUILD · JAN — FEB 2025",
    result: "CNN classifier that calls uploaded faces FAKE or REAL at 95%+ accuracy — trained and evaluated across 10,000+ real and manipulated images.",
    chips: ["TENSORFLOW", "OPENCV", "FLASK"],
    side: 1, repo: "https://github.com/shri-ram07/DeepFakeDetection.git", Visual: DeepfakeVisual,
  },
];

const APPENDIX = [
  {
    id: "A1", title: "A1 — SymptomIQ · Health condition predictor",
    desc: "Symptoms → predicted condition at 90%+ accuracy, with geolocated doctor recommendations.",
    tags: "FLASK · TENSORFLOW · GEMINI", href: "https://github.com/shri-ram07/SymptomIQ.git",
  },
  {
    id: "A2", title: "A2 — Automated power monitoring · IoT + vision",
    desc: "Presence-driven appliance control — 1st place, intra-institutional startup competition (50+ teams).",
    tags: "OPENCV · IOT · 🏆 1ST_PLACE", href: null as string | null,
  },
  {
    id: "A3", title: "A3 — Fake news detection · NLP",
    desc: "TF-IDF + Scikit-Learn classifier hitting high F1-scores across a 20,000+ article dataset.",
    tags: "NLTK · TF-IDF · SCIKIT-LEARN", href: null,
  },
];

const SKILLS = [
  { name: "Agentic AI & LLMs", code: "SYS_A", off: "0px", items: ["Gemini API", "RAG", "MCP", "Orchestration", "Agent memory", "n8n"] },
  { name: "Computer Vision", code: "SYS_B", off: "14px", items: ["OpenCV", "MediaPipe", "YOLOv8", "ST-GNN", "Pose estimation", "Deepfake detection"] },
  { name: "ML & Deep Learning", code: "SYS_C", off: "4px", items: ["TensorFlow", "PyTorch", "Keras", "3D U-Net", "CNN / LSTM", "Transformers"] },
  { name: "Backend & Cloud", code: "SYS_D", off: "18px", items: ["FastAPI", "REST / OAuth2", "Docker", "GCP Cloud Run", "CI/CD", "MySQL"] },
];

const RECORD = [
  {
    when: "JUN 2025 — JUL 2026 · REMOTE", what: "Founding AI Engineer — Ryze AI",
    bullets: [
      "Architected the production Ads Specialist Agent end-to-end — Gemini orchestrated against Google Ads, Meta Ads and Analytics APIs for autonomous campaign optimization.",
      "Scaled a multi-tenant FastAPI microservices backend to 1,000+ concurrent users; owned deploys, monitoring and cost on GCP (Cloud Run, VMs).",
      "Built MCP servers for agent tool access and a persistent agent-memory system for multi-step reasoning across 1,000+ user interactions.",
    ],
  },
  {
    when: "MAR — OCT 2025 · REMOTE", what: "AI Intern — Realfy Oasis",
    bullets: [
      "Real-time action recognition at 92%+ accuracy (ST-GNN, LSTM, Transformers, MediaPipe); facial authentication at 98% across 500+ daily verifications.",
      "Cut manual intervention 70% with n8n + LLM agentic pipelines; cut false positives 40% with autoencoder anomaly detection.",
    ],
  },
  {
    when: "2023 — 2027 · RAIPUR", what: "B.Tech CS (AIML) — Kalinga University",
    bullets: [], note: "CGPA 9.46/10.",
  },
  {
    when: "MARGINALIA", what: "Proof of work",
    bullets: [],
    note: "1st place, intra-institutional startup competition (50+ teams) · Google Cloud Certified Generative AI Leader · 3 national 24-hour hackathons — Kalinga Hackathon, Hackomania, HackGenX · HackerRank advanced certs in Python, C, SQL.",
  },
];

/* ------------------------------ contact form ------------------------------ */

function ContactForm() {
  const [state, handleSubmit] = useForm("mjkzdpzp");
  if (state.succeeded) {
    return (
      <div style={{ border: "1px solid rgba(127,163,232,.5)", padding: "22px 24px", maxWidth: 560 }}>
        <div style={{ font: mono(600, "12px"), letterSpacing: ".12em", color: SKY }}>TRANSMISSION_RECEIVED ✓</div>
        <p style={{ margin: "8px 0 0", font: sans(400, "14.5px/1.6"), color: "rgba(237,239,242,.85)" }}>
          Thanks for the message — I'll get back to you within a day.
        </p>
      </div>
    );
  }
  const label: CSSProperties = { font: mono(500, "10px"), letterSpacing: ".14em", color: "rgba(237,239,242,.6)" };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 560 }}>
      <span style={{ font: mono(500, "10.5px"), letterSpacing: ".14em", color: "rgba(237,239,242,.45)" }}>
        FORM_01 — WRITTEN TRANSMISSION (OR JUST EMAIL ME)
      </span>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <label style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
          <span style={label}>NAME</span>
          <input className="bp-input" type="text" name="name" required autoComplete="name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </label>
        <label style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
          <span style={label}>EMAIL</span>
          <input className="bp-input" type="email" name="email" required autoComplete="email" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </label>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={label}>MESSAGE</span>
        <textarea className="bp-input" name="message" rows={4} required />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </label>
      <button type="submit" disabled={state.submitting} className="bp-btn-paper" data-cur
        style={{ alignSelf: "flex-start", cursor: "pointer", border: "none", background: PAPER, color: INK, font: mono(600, "12px"), letterSpacing: ".08em", padding: "11px 20px", opacity: state.submitting ? 0.6 : 1 }}>
        {state.submitting ? "SENDING…" : "SEND →"}
      </button>
    </form>
  );
}

/* --------------------------------- page ----------------------------------- */

const Index = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const [curtain, setCurtain] = useState(false);
  const [vw, setVw] = useState(() => (typeof window === "undefined" ? 1440 : window.innerWidth));
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const R = rootRef.current;
    if (!R) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(pointer: fine)").matches && !reduced;
    setFine(finePointer);

    let curStyle: HTMLStyleElement | null = null;
    if (finePointer) {
      curStyle = document.createElement("style");
      curStyle.textContent = "*{cursor:none !important}";
      document.head.appendChild(curStyle);
    }

    /* smooth scrolling — drives the whole page feel; animations read the
       interpolated scrollY every frame so they smooth out for free */
    const lenis = reduced ? null : new Lenis({ autoRaf: false, anchors: true, lerp: 0.09 });

    const q = <T extends HTMLElement>(s: string) => Array.from(R.querySelectorAll<T>(s));
    const el = {
      grid: R.querySelector<HTMLElement>("[data-grid]"),
      hero: R.querySelector<HTMLElement>("[data-hero]"),
      heroIn: R.querySelector<HTMLElement>("[data-hero-in]"),
      meta: R.querySelector<HTMLElement>("[data-hmeta]"),
      cue: R.querySelector<HTMLElement>("[data-cue]"),
      letters: q<HTMLElement>("[data-l]"),
      nav: R.querySelector<HTMLElement>("[data-nav]"),
      coord: R.querySelector<HTMLElement>("[data-coord]"),
      photo: R.querySelector<HTMLElement>("[data-photo]"),
      rail: R.querySelector<HTMLElement>("[data-rail]"),
      cta: R.querySelector<HTMLElement>("[data-cta]"),
      dot: null as HTMLElement | null,
      ring: null as HTMLElement | null,
      scenes: q<HTMLElement>("[data-scene]").map((w) => ({
        w,
        sheet: w.querySelector<HTMLElement>("[data-sheet]")!,
        meta: w.querySelector<HTMLElement>("[data-smeta]")!,
        title: w.querySelector<HTMLElement>("[data-stitle]")!,
      })),
    };

    /* preloader */
    let plr = 0;
    if (sessionStorage.getItem("srd-pl") || reduced) {
      setGone(true);
      setPct(100);
    } else {
      const t0 = performance.now();
      const tick = (n: number) => {
        const p = Math.min(1, (n - t0) / 1300);
        setPct(Math.round(p * 100));
        if (p < 1) plr = requestAnimationFrame(tick);
        else {
          sessionStorage.setItem("srd-pl", "1");
          setCurtain(true);
          setTimeout(() => setGone(true), 800);
        }
      };
      plr = requestAnimationFrame(tick);
    }

    /* scroll reveals */
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.style.opacity = "1";
            t.style.transform = t.dataset.base || "translateY(0)";
            io.unobserve(t);
          }
        }),
      { threshold: 0.12 }
    );
    if (!reduced)
      q<HTMLElement>("[data-rev]").forEach((n, i) => {
        const cur = getComputedStyle(n).transform;
        n.dataset.base = cur === "none" ? "translateY(0)" : cur;
        n.style.opacity = "0";
        n.style.transform = (cur === "none" ? "" : cur + " ") + "translateY(26px)";
        n.style.transition =
          `opacity .7s ${(i % 4) * 0.08}s cubic-bezier(.2,.7,.2,1), transform .7s ${(i % 4) * 0.08}s cubic-bezier(.2,.7,.2,1)`;
        io.observe(n);
      });

    /* pointer + magnetic CTA */
    let mx = 0.5, my = 0.5, px = innerWidth / 2, py = innerHeight / 2;
    let cx = px, cy = py, rx = px, ry = py, cs = 1, hov = false;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / innerWidth;
      my = e.clientY / innerHeight;
      px = e.clientX;
      py = e.clientY;
      hov = !!(e.target as HTMLElement | null)?.closest?.("[data-cur]");
      const c = el.cta;
      if (c && finePointer) {
        const r = c.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        c.style.transform =
          Math.hypot(dx, dy) < Math.max(r.width * 0.7, 200)
            ? `translate(${dx * 0.16}px,${dy * 0.16}px)`
            : "translate(0,0)";
      }
    };
    addEventListener("mousemove", onMove, { passive: true });
    const onResize = () => setVw(innerWidth);
    addEventListener("resize", onResize);

    /* main rAF loop */
    const ease = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t));
    let raf = 0;
    const frame = (t: number) => {
      lenis?.raf(t);
      const vh = innerHeight, y = scrollY;
      const mobile = innerWidth < 720;
      if (el.grid) el.grid.style.transform = `translateY(${-((y * 0.08) % 130)}px)`;
      if (el.coord) el.coord.textContent = "Y_" + String(Math.min(99999, Math.round(y))).padStart(5, "0");
      if (el.nav) {
        el.nav.style.background = y > 40 ? "rgba(237,239,242,.94)" : "transparent";
        el.nav.style.boxShadow = y > 40 ? "0 1px 0 rgba(16,35,63,.2)" : "none";
      }
      if (el.hero) {
        const r = el.hero.getBoundingClientRect();
        const p = ease(-r.top / (r.height - vh));
        const p2 = ease((p - 0.2) / 0.8);
        const dx = mx - 0.5, dy = my - 0.5;
        const dist = mobile ? 150 : 460, lift = mobile ? 110 : 240;
        el.letters.forEach((L) => {
          const d = +L.dataset.l!, s = +L.dataset.s!;
          L.style.transform =
            p < 0.2 && finePointer
              ? `translate(${dx * d * 20}px,${dy * d * 13}px)`
              : `translate(${s * d * p2 * dist}px,${(d - 0.55) * p2 * lift}px) scale(${1 + p2 * d * (mobile ? 0.6 : 1.35)})`;
          L.style.opacity = String(Math.max(0, 1 - p2 * 1.3));
        });
        if (el.meta) {
          el.meta.style.opacity = String(Math.max(0, 1 - p * 2.4));
          el.meta.style.transform = `translateY(${-p * 70}px)`;
        }
        if (el.cue) el.cue.style.opacity = String(Math.max(0, 1 - p * 5));
        if (el.heroIn) el.heroIn.style.transform = `scale(${1 + p2 * 0.05})`;
      }
      el.scenes.forEach((S) => {
        const r = S.w.getBoundingClientRect();
        if (r.bottom < -60 || r.top > vh + 60) return;
        const p = ease(-r.top / (r.height - vh));
        const g = ease(p / 0.68);
        S.sheet.style.transform = `scale(${(mobile ? 0.82 : 0.66) + g * (mobile ? 0.175 : 0.485)})`;
        const qv = ease((p - 0.34) / 0.28), side = +S.meta.dataset.side!;
        S.meta.style.opacity = String(qv);
        S.meta.style.transform = `translateX(${side * (1 - qv) * 46}px)`;
        S.title.style.transform = `translateY(${-p * 40}px)`;
      });
      if (el.photo) {
        const r = el.photo.getBoundingClientRect();
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        el.photo.style.transform = `translateY(${c * -24}px)`;
      }
      if (el.rail) {
        const r = el.rail.parentElement!.getBoundingClientRect();
        el.rail.style.transform = `scaleY(${ease((vh - r.top) / (r.height + vh * 0.35))})`;
      }
      if (finePointer) {
        if (!el.dot) el.dot = R.querySelector<HTMLElement>("[data-cdot]");
        if (!el.ring) el.ring = R.querySelector<HTMLElement>("[data-cring]");
        if (el.dot && el.ring) {
          cx += (px - cx) * 0.4;
          cy += (py - cy) * 0.4;
          rx += (px - rx) * 0.16;
          ry += (py - ry) * 0.16;
          cs += ((hov ? 2 : 1) - cs) * 0.18;
          el.dot.style.transform = `translate(${cx - 3}px,${cy - 3}px)`;
          el.ring.style.transform = `translate(${rx - 16}px,${ry - 16}px) scale(${cs})`;
          el.ring.style.borderColor = hov ? RED : BLUE;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(plr);
      removeEventListener("mousemove", onMove);
      removeEventListener("resize", onResize);
      io.disconnect();
      lenis?.destroy();
      curStyle?.remove();
    };
  }, []);

  const isDesk = vw >= 860;
  const isMobile = vw < 720;
  const secPad = "clamp(16px,4vw,56px)";
  const monoLabel: CSSProperties = { font: mono(500, "11.5px"), letterSpacing: ".12em", color: BLUE };

  return (
    <div ref={rootRef} style={{ position: "relative", background: PAPER, color: INK, fontFamily: "'Instrument Sans',system-ui,sans-serif", overflowX: "clip" }}>
      {/* drafting grid */}
      <div
        data-grid
        style={{
          position: "fixed", left: 0, top: -130, right: 0, height: "calc(100vh + 260px)", pointerEvents: "none", zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(16,35,63,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(16,35,63,.05) 1px,transparent 1px),linear-gradient(rgba(16,35,63,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(16,35,63,.09) 1px,transparent 1px)",
          backgroundSize: "26px 26px,26px 26px,130px 130px,130px 130px",
        }}
      />

      {/* preloader */}
      {!gone && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200, background: INK, color: PAPER, display: "flex", flexDirection: "column",
            justifyContent: "space-between", padding: "28px 32px",
            transform: `translateY(${curtain ? "-100%" : "0%"})`, transition: "transform .78s cubic-bezier(.76,0,.24,1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", font: mono(500, "12px"), letterSpacing: ".12em", color: "rgba(237,239,242,.6)" }}>
            <span>SHRI_RAM_DWIVEDI</span>
            <span>PORTFOLIO/2026</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
            <div style={{ font: mono(500, "12px"), letterSpacing: ".14em", color: SKY }}>LOADING_FIGURES</div>
            <div style={{ font: cond(600, "clamp(80px,16vw,180px)/0.85"), letterSpacing: ".01em" }}>{String(pct).padStart(3, "0")}</div>
            <div style={{ width: "min(420px,70vw)", height: 2, background: "rgba(237,239,242,.18)" }}>
              <div style={{ height: "100%", background: PAPER, width: `${pct}%` }} />
            </div>
          </div>
          <div style={{ font: mono(500, "11px"), letterSpacing: ".12em", color: "rgba(237,239,242,.45)" }}>FIG.00 — IDENTITY · DRAWN TO SCALE</div>
        </div>
      )}

      {/* nav */}
      <nav
        data-nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", flexDirection: "column",
          gap: 8, padding: `12px clamp(16px,3vw,32px)`, backdropFilter: "blur(8px)", transition: "background .3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="#top" data-cur style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", color: INK }}>
            <span style={{ font: cond(700, "17px"), letterSpacing: ".06em" }}>S.R.DWIVEDI</span>
            <span data-coord style={{ font: mono(500, "10.5px"), color: BLUE, letterSpacing: ".08em" }}>Y_00000</span>
          </a>
          {isDesk && (
            <div style={{ display: "flex", gap: 26, font: mono(500, "12px"), letterSpacing: ".1em" }}>
              {[["#work", "01_WORK"], ["#about", "02_ABOUT"], ["#experience", "03_RECORD"], ["#contact", "04_CONTACT"]].map(([h, t]) => (
                <a key={h} href={h} data-cur className="bp-nav" style={{ textDecoration: "none", color: INK }}>{t}</a>
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {isDesk && <LiveDot label="OPEN_TO_ROLES" />}
            <a href={RESUME_URL} download="Shri_Ram_Dwivedi_Resume.pdf" data-cur className="bp-btn-ink"
              style={{ textDecoration: "none", background: INK, color: PAPER, font: mono(600, "12px"), letterSpacing: ".08em", padding: "8px 14px", border: `1px solid ${INK}` }}>
              RESUME ↓
            </a>
          </div>
        </div>
        {!isDesk && (
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, font: mono(500, "10px"), letterSpacing: ".08em" }}>
            {[["#work", "01_WORK"], ["#about", "02_ABOUT"], ["#experience", "03_RECORD"], ["#contact", "04_CONTACT"]].map(([h, t]) => (
              <a key={h} href={h} data-cur className="bp-nav" style={{ textDecoration: "none", color: "rgba(16,35,63,.75)" }}>{t}</a>
            ))}
          </div>
        )}
      </nav>

      {/* hero */}
      <header id="top" data-hero style={{ position: "relative", height: isMobile ? "160vh" : "190vh", zIndex: 1 }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: `0 ${secPad}` }}>
          <div data-hero-in style={{ display: "flex", flexDirection: "column", gap: "clamp(14px,2.5vh,26px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", ...monoLabel }}>
              <span>FIG.00 — IDENTITY</span>
              <span>SCALE 1:1</span>
            </div>
            <h1 style={{ margin: 0, font: cond(600, "clamp(52px,12.5vw,182px)/0.88"), letterSpacing: ".005em", color: INK, textTransform: "uppercase", display: "flex", flexDirection: "column" }}>
              {HERO_ROWS.map((row, ri) => (
                <span key={ri} style={{ display: "flex" }}>
                  {row.map(([ch, l, s], ci) =>
                    ch === "" ? (
                      <span key={ci} style={{ width: ".35em" }} />
                    ) : (
                      <span key={ci} data-l={l} data-s={s} style={{ display: "inline-block", willChange: "transform" }}>{ch}</span>
                    )
                  )}
                </span>
              ))}
            </h1>
            <div data-hmeta style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ height: 1, flex: "0 0 44px", background: BLUE }} />
                <span style={{ font: mono(500, "clamp(11px,1.2vw,13px)"), letterSpacing: ".14em", color: BLUE }}>
                  AI/ML_ENGINEER · B.TECH AIML — CLASS OF 2027
                </span>
              </div>
              <p style={{ margin: 0, font: sans(400, "clamp(15px,1.6vw,19px)/1.55"), color: INK, textWrap: "pretty" }}>
                I design and ship AI systems that hold up in production — autonomous agents, vision models, and the cloud
                infrastructure they run on. Founding-engineer experience before graduating.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#work" data-cur className="bp-btn-blue" style={{ textDecoration: "none", background: BLUE, color: SHEET, font: mono(600, "12.5px"), letterSpacing: ".08em", padding: "12px 20px" }}>
                  VIEW_WORK →
                </a>
                <a href={`mailto:${EMAIL}`} data-cur className="bp-btn-ghost" style={{ textDecoration: "none", color: INK, font: mono(600, "12.5px"), letterSpacing: ".08em", padding: "12px 20px", border: "1px solid rgba(16,35,63,.4)" }}>
                  CONTACT
                </a>
              </div>
            </div>
          </div>
          <div data-cue style={{ position: "absolute", bottom: 26, left: "50%", marginLeft: -60, width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, font: mono(500, "10.5px"), letterSpacing: ".14em", color: "rgba(16,35,63,.55)" }}>
            <span>SCROLL_TO_DESCEND</span>
            <span style={{ animation: "cueBob 1.6s ease-in-out infinite" }}>↓</span>
          </div>
        </div>
      </header>

      {/* work */}
      <section id="work" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ padding: `8vh ${secPad} 2vh`, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, font: cond(600, "clamp(34px,5vw,64px)/1"), letterSpacing: ".01em", textTransform: "uppercase" }}>Selected work</h2>
          <span style={monoLabel}>SHEETS 01—04 · DRAWN FROM PRODUCTION</span>
        </div>

        {SCENES.map((sc) => (
          <div key={sc.n} data-scene style={{ position: "relative", height: isMobile ? "175vh" : "230vh" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
              <div data-stitle style={{ position: "absolute", top: isMobile ? "11vh" : "9vh", left: secPad, right: secPad, zIndex: 3, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, pointerEvents: "none" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ font: mono(500, "11px"), letterSpacing: ".12em", color: BLUE }}>{sc.fig}</span>
                  <span style={{ font: cond(600, "clamp(24px,3.6vw,48px)/1"), textTransform: "uppercase", color: INK }}>{sc.title}</span>
                </div>
                {!isMobile && <span style={{ font: cond(600, "clamp(20px,2.6vw,34px)/1"), color: "rgba(16,35,63,.35)" }}>{sc.n}/04</span>}
              </div>
              <div data-sheet style={{ position: "absolute", inset: isMobile ? "20vh 4vw 34vh" : "16vh 7vw 12vh", background: SHEET, border: "1px solid rgba(16,35,63,.35)", boxShadow: "0 24px 60px -30px rgba(16,35,63,.35)", willChange: "transform" }}>
                {([["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]] as const).map(([v, h]) => (
                  <span key={v + h} style={{ position: "absolute", [v]: -1, [h]: -1, width: 18, height: 18, [`border${v[0].toUpperCase() + v.slice(1)}`]: `2px solid ${INK}`, [`border${h[0].toUpperCase() + h.slice(1)}`]: `2px solid ${INK}` } as CSSProperties} />
                ))}
                <div style={{ position: "absolute", inset: isMobile ? 8 : 14 }}>
                  <sc.Visual compact={isMobile} />
                </div>
                <span style={{ position: "absolute", top: -22, right: 0, font: mono(500, "10px"), letterSpacing: ".1em", color: "rgba(16,35,63,.5)" }}>
                  SHEET_{sc.n} · REV_A
                </span>
              </div>
              <div style={{ position: "absolute", left: "clamp(14px,5vw,48px)", right: "clamp(14px,5vw,48px)", bottom: isMobile ? "3vh" : "8vh", zIndex: 4, display: "flex", pointerEvents: "none", justifyContent: sc.side < 0 ? "flex-start" : "flex-end" }}>
                <div data-smeta data-side={sc.side} style={{ pointerEvents: "auto", width: "min(440px,100%)", background: INK, color: PAPER, padding: isMobile ? "13px 15px" : "20px 22px", display: "flex", flexDirection: "column", gap: isMobile ? 7 : 10, boxShadow: "0 18px 44px -18px rgba(16,35,63,.5)" }}>
                  <span style={{ font: mono(500, "10.5px"), letterSpacing: ".12em", color: SKY }}>{sc.role}</span>
                  <p style={{ margin: 0, font: sans(400, isMobile ? "12.5px/1.5" : "14px/1.55"), color: "rgba(237,239,242,.92)", textWrap: "pretty" }}>{sc.result}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {sc.chips.map((ch) => (
                      <span key={ch} style={{ font: mono(500, "10px"), letterSpacing: ".06em", border: "1px solid rgba(237,239,242,.3)", padding: "3px 8px", color: "rgba(237,239,242,.8)" }}>{ch}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 2 }}>
                    {sc.repo ? (
                      <a href={sc.repo} target="_blank" rel="noreferrer" data-cur className="bp-meta-link"
                        style={{ font: mono(600, "11.5px"), letterSpacing: ".1em", color: PAPER, textDecoration: "none", borderBottom: `1px solid ${SKY}`, paddingBottom: 2 }}>
                        GITHUB ↗
                      </a>
                    ) : (
                      <a href="#contact" data-cur className="bp-meta-link"
                        style={{ font: mono(600, "11.5px"), letterSpacing: ".1em", color: PAPER, textDecoration: "none", borderBottom: `1px solid ${SKY}`, paddingBottom: 2 }}>
                        CASE_STUDY — ON_REQUEST
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* appendix */}
        <div style={{ padding: `10vh ${secPad} 12vh`, maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, font: cond(600, "clamp(22px,2.6vw,32px)/1"), textTransform: "uppercase" }}>Further experiments</h3>
            <span style={{ font: mono(500, "11px"), letterSpacing: ".12em", color: BLUE }}>APPENDIX A</span>
          </div>
          {APPENDIX.map((a, i) => (
            <div key={a.id} data-rev style={{ display: "flex", justifyContent: "space-between", gap: 18, padding: "16px 0", borderTop: "1px solid rgba(16,35,63,.25)", borderBottom: i === APPENDIX.length - 1 ? "1px solid rgba(16,35,63,.25)" : undefined, flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: "min(420px,100%)", flex: "1 1 300px" }}>
                {a.href ? (
                  <a href={a.href} target="_blank" rel="noreferrer" data-cur className="bp-nav" style={{ font: cond(600, "17px"), letterSpacing: ".03em", textTransform: "uppercase", color: INK, textDecoration: "none" }}>
                    {a.title} ↗
                  </a>
                ) : (
                  <span style={{ font: cond(600, "17px"), letterSpacing: ".03em", textTransform: "uppercase" }}>{a.title}</span>
                )}
                <span style={{ font: sans(400, "13px/1.5"), color: "rgba(16,35,63,.7)" }}>{a.desc}</span>
              </div>
              <span style={{ font: mono(500, "10.5px"), color: "rgba(16,35,63,.55)", letterSpacing: ".06em" }}>{a.tags}</span>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      <section id="about" style={{ position: "relative", zIndex: 1, background: INK, color: PAPER, padding: `12vh ${secPad}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(290px,100%),1fr))", gap: "clamp(28px,5vw,72px)", alignItems: "center" }}>
          <div style={{ position: "relative", maxWidth: 420, justifySelf: "center", width: "100%" }}>
            <div data-photo style={{ position: "relative", border: "1px solid rgba(237,239,242,.35)", padding: 12, background: "rgba(237,239,242,.04)", willChange: "transform" }}>
              <span style={{ position: "absolute", top: -1, left: -1, width: 16, height: 16, borderTop: `2px solid ${SKY}`, borderLeft: `2px solid ${SKY}` }} />
              <span style={{ position: "absolute", bottom: -1, right: -1, width: 16, height: 16, borderBottom: `2px solid ${SKY}`, borderRight: `2px solid ${SKY}` }} />
              <img src={profilePhoto} alt="Shri Ram Dwivedi" style={{ display: "block", width: "100%", filter: "grayscale(100%) contrast(1.05)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, font: mono(500, "10px"), letterSpacing: ".1em", color: "rgba(237,239,242,.55)" }}>
                <span>SUBJECT — S.R.DWIVEDI</span>
                <span>RAIPUR, IN</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ font: mono(500, "11.5px"), letterSpacing: ".12em", color: SKY }}>FIG.02 — ABOUT</span>
            <h2 style={{ margin: 0, font: cond(600, "clamp(30px,4vw,52px)/1"), textTransform: "uppercase", textWrap: "pretty" }}>
              Engineer first.<br />Still a student — on paper.
            </h2>
            <p data-rev style={{ margin: 0, font: sans(400, "clamp(14.5px,1.4vw,16.5px)/1.65"), color: "rgba(237,239,242,.85)", maxWidth: "56ch", textWrap: "pretty" }}>
              I'm a final-stretch B.Tech (CS — AIML) student at Kalinga University, CGPA 9.46, graduating 2027. I've spent the
              degree shipping instead of waiting: founding AI engineer at Ryze AI, where I owned a production ads agent
              end-to-end on GCP, and before that an AI internship at Realfy Oasis building real-time vision systems.
            </p>
            <p data-rev style={{ margin: 0, font: sans(400, "clamp(14.5px,1.4vw,16.5px)/1.65"), color: "rgba(237,239,242,.65)", maxWidth: "56ch", textWrap: "pretty" }}>
              Looking for: AI/ML engineering roles where agents, vision, or LLM infrastructure meet production traffic.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={RESUME_URL} download="Shri_Ram_Dwivedi_Resume.pdf" data-cur className="bp-btn-paper" style={{ textDecoration: "none", background: PAPER, color: INK, font: mono(600, "12px"), letterSpacing: ".08em", padding: "11px 18px" }}>
                RESUME_PDF ↓
              </a>
              <a href={`mailto:${EMAIL}`} data-cur className="bp-btn-ghost-light" style={{ textDecoration: "none", color: PAPER, font: mono(600, "12px"), letterSpacing: ".08em", padding: "11px 18px", border: "1px solid rgba(237,239,242,.4)" }}>
                EMAIL_ME
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* skills */}
      <section id="skills" style={{ position: "relative", zIndex: 1, padding: `12vh ${secPad}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 34 }}>
            <h2 style={{ margin: 0, font: cond(600, "clamp(30px,4vw,52px)/1"), textTransform: "uppercase" }}>Instrument panel</h2>
            <span style={monoLabel}>FIG.03 — CAPABILITIES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(235px,100%),1fr))", gap: 16, alignItems: "start" }}>
            {SKILLS.map((sk) => (
              <div key={sk.code} data-rev style={{ background: SHEET, border: "1px solid rgba(16,35,63,.3)", padding: 18, display: "flex", flexDirection: "column", gap: 12, transform: isMobile ? undefined : `translateY(${sk.off})` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <span style={{ font: cond(600, "19px"), letterSpacing: ".03em", textTransform: "uppercase" }}>{sk.name}</span>
                  <span style={{ font: mono(500, "10px"), color: BLUE }}>{sk.code}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {sk.items.map((it) => (
                    <span key={it} style={{ font: mono(500, "10.5px"), letterSpacing: ".04em", border: "1px solid rgba(16,35,63,.25)", padding: "3px 8px", color: "rgba(16,35,63,.8)" }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, font: mono(500, "11px"), letterSpacing: ".1em", color: "rgba(16,35,63,.55)" }}>
            LANGUAGES — PYTHON · JAVA · SQL · C
          </div>
        </div>
      </section>

      {/* experience */}
      <section id="experience" style={{ position: "relative", zIndex: 1, padding: `6vh ${secPad} 12vh` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 34 }}>
            <h2 style={{ margin: 0, font: cond(600, "clamp(30px,4vw,52px)/1"), textTransform: "uppercase" }}>The record</h2>
            <span style={monoLabel}>FIG.04 — CHRONOLOGY</span>
          </div>
          <div style={{ position: "relative", paddingLeft: "clamp(20px,4vw,40px)" }}>
            <div data-rail style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: BLUE, transformOrigin: "top", willChange: "transform" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 38 }}>
              {RECORD.map((r) => (
                <div key={r.what} data-rev style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ font: mono(500, "11px"), letterSpacing: ".1em", color: BLUE }}>{r.when}</span>
                  <span style={{ font: cond(600, "clamp(21px,2.4vw,28px)/1.1"), textTransform: "uppercase" }}>{r.what}</span>
                  {r.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: 18, font: sans(400, "14px/1.6"), color: "rgba(16,35,63,.8)", display: "flex", flexDirection: "column", gap: 6, maxWidth: "64ch" }}>
                      {r.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {"note" in r && r.note && (
                    <span style={{ font: sans(400, "14px/1.65"), color: "rgba(16,35,63,.8)", maxWidth: "64ch" }}>{r.note}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <footer id="contact" style={{ position: "relative", zIndex: 1, background: INK, color: PAPER, padding: `14vh ${secPad} 26px`, overflow: "hidden" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 34 }}>
          <span style={{ font: mono(500, "11.5px"), letterSpacing: ".12em", color: SKY }}>FIG.05 — CONTACT · HAVE A ROLE IN MIND?</span>
          <a data-cta data-cur href={`mailto:${EMAIL}`} className="bp-cta"
            style={{ textDecoration: "none", color: PAPER, font: cond(600, "clamp(40px,9vw,128px)/0.95"), textTransform: "uppercase", letterSpacing: ".01em", display: "inline-block", width: "max-content", maxWidth: "100%", willChange: "transform", transition: "color .25s", overflowWrap: "anywhere" }}>
            Get in touch ↗
          </a>
          <ContactForm />
          <div style={{ display: "flex", gap: "14px 22px", flexWrap: "wrap", alignItems: "center", font: mono(500, "12px"), letterSpacing: ".08em" }}>
            <span style={{ color: "rgba(237,239,242,.85)", overflowWrap: "anywhere" }}>{EMAIL.toUpperCase()}</span>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" data-cur className="bp-link-sky" style={{ color: SKY, textDecoration: "none", borderBottom: "1px solid rgba(127,163,232,.5)", paddingBottom: 2 }}>LINKEDIN ↗</a>
            <a href={GITHUB} target="_blank" rel="noreferrer" data-cur className="bp-link-sky" style={{ color: SKY, textDecoration: "none", borderBottom: "1px solid rgba(127,163,232,.5)", paddingBottom: 2 }}>GITHUB ↗</a>
            <a href={RESUME_URL} download="Shri_Ram_Dwivedi_Resume.pdf" data-cur className="bp-btn-paper" style={{ color: INK, background: PAPER, textDecoration: "none", padding: "9px 16px", font: mono(600, "12px"), letterSpacing: ".08em" }}>RESUME ↓</a>
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#4CAF6E" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4CAF6E" }} />
              OPEN TO AI/ML ROLES — CLASS OF 2027
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", borderTop: "1px solid rgba(237,239,242,.18)", paddingTop: 18, font: mono(500, "10.5px"), letterSpacing: ".1em", color: "rgba(237,239,242,.45)" }}>
            <span>© 2026 SHRI RAM DWIVEDI</span>
            <span>RAIPUR, IN — WORKS REMOTE</span>
            <span>THIS PAGE IS THE PROTOTYPE — BUILT WITH REAL CODE</span>
          </div>
        </div>
      </footer>

      {/* custom cursor */}
      {fine && (
        <>
          <div data-cdot style={{ position: "fixed", left: 0, top: 0, width: 6, height: 6, borderRadius: "50%", background: RED, zIndex: 300, pointerEvents: "none", willChange: "transform" }} />
          <div data-cring style={{ position: "fixed", left: 0, top: 0, width: 32, height: 32, borderRadius: "50%", border: `1.5px solid ${BLUE}`, zIndex: 300, pointerEvents: "none", willChange: "transform", transition: "border-color .2s" }} />
        </>
      )}
    </div>
  );
};

export default Index;
