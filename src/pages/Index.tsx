import { CSSProperties, ReactNode, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import profilePhoto from "@/assets/profile.png";

/* ---------------------------------- data ---------------------------------- */

const EMAIL = "raunakd511@gmail.com";
const GITHUB = "https://github.com/shri-ram07";
const LINKEDIN = "https://www.linkedin.com/in/shri-ramd07/";
const RESUME_URL = "/assets/Shri_Ram_Dwivedi_AI_Engineer.pdf";

const INK = "#16150f";
const MONO = "'Geist Mono', monospace";
const GLOW = "radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,0.6), rgba(255,255,255,0) 55%)";

/* one tone per section: label colour, card gradient, shadow tint, puzzle-tab colour, text colours */
type Tone = { tag: string; card: string; shadow: string; knob?: string; meta?: string; text: string };
const VIOLET: Tone = { tag: "#57536b", card: "#f1edff 0%, #ddd3ff 55%, #c9bbff 100%", shadow: "60,40,120", knob: "#d6caff", meta: "#4b4566", text: "#2c2938" };
const BLUE: Tone = { tag: "#46566b", card: "#edf6ff 0%, #d2e7ff 55%, #b6d7ff 100%", shadow: "20,60,120", knob: "#c6e0ff", meta: "#3e4d61", text: "#25303d" };
const AMBER: Tone = { tag: "#655a3c", card: "#fff7de 0%, #ffe8ae 55%, #ffd585 100%", shadow: "120,80,20", knob: "#ffe09c", text: "#3a3222" };
const GREEN: Tone = { tag: "#4c5e3f", card: "#f0fae3 0%, #d8f0bd 55%, #bfe6a0 100%", shadow: "40,90,20", text: "#2c3825" };

type Entry = { name: string; meta: string; body: string; href?: string };

const WORK: Entry[] = [
  {
    name: "Ryze AI", meta: "Founding AI Engineer · 2025 to 2026",
    body: "Built the production agent that reads live ad data, then optimises campaigns and budgets with no human in the loop. MCP servers, prompt framework, long-term memory, and a FastAPI backend serving 1,000+ concurrent users.",
  },
  {
    name: "ScalixAI", meta: "AI Engineer, freelance · 2026",
    body: "Shipped a 150+ tool MCP server that lets Claude and ChatGPT run Google Ads in plain English. Every change goes plan, then confirm, with built-in policy checks.",
  },
];

const VISION: Entry[] = [
  {
    name: "Realfy Oasis", meta: "AI Intern · 2025",
    body: "Real-time multi-person action recognition at 92%, face verification at 98% across 500+ daily checks, and an autoencoder that cut false alarms by 40%.",
  },
  {
    name: "NeuroInsight AI", meta: "Research build",
    body: "A 3D U-Net that outlines brain tumours in MRI scans, evaluated on BraTS, with heat-maps showing where the model looked and where it is unsure.",
  },
];

const PROJECTS: Entry[] = [
  {
    name: "LeastWise", meta: "GitHub ↗", href: `${GITHUB}/LeastWise`,
    body: "A Gemini agent that trims cloud IAM to the minimum: 227 permissions down to 48 with zero dangerous removals. Tech Zephyr 4.0, IIT Bhubaneswar.",
  },
  {
    name: "DeepFake Detector", meta: "GitHub ↗", href: `${GITHUB}/DeepFakeDetection`,
    body: "A CNN trained on 10,000+ images that tells real faces from manipulated ones at 95%+ accuracy.",
  },
  {
    name: "Fake News Detection", meta: "GitHub ↗", href: `${GITHUB}/FakeNewsDetection`,
    body: "A TF-IDF classifier at 96% accuracy on 20,000+ articles, checking any story in real time.",
  },
];

const STACK = [
  ["Agentic AI & LLMs", "Gemini API, MCP, agentic workflows, orchestration, prompt engineering, RAG, n8n"],
  ["Deep learning", "PyTorch, TensorFlow, Transformers, OpenCV, MediaPipe, ONNX Runtime"],
  ["Backend & web", "FastAPI, Node.js, Flask, REST, OAuth2, PostgreSQL, React, TypeScript"],
  ["Cloud & DevOps", "Google Cloud Run, Compute Engine, Docker, CI/CD, autoscaling"],
];

/* the 4:5 stat boards — the travelling puzzle is cut from these */
type Art = { label: string; n: string; stat: ReactNode; size: string; lh: number; caption: string; grad: string[] };

const ART: Record<string, Art> = {
  ryze: { label: "Ryze AI", n: "01", stat: "1,000+", size: "24cqw", lh: 0.82, caption: "concurrent users on one agent platform", grad: ["#ddd3ff", "#a991ff", "#7a63f5"] },
  realfy: { label: "Realfy Oasis", n: "02", stat: "98%", size: "40cqw", lh: 0.8, caption: "face verification accuracy, 500+ checks a day", grad: ["#d2ebff", "#82bcff", "#4a86f7"] },
  leastwise: { label: "LeastWise", n: "03", stat: <>227<br />→ 48</>, size: "27cqw", lh: 0.84, caption: "IAM permissions, zero dangerous removals", grad: ["#fff3b0", "#ffd04f", "#ffa23a"] },
  kalinga: { label: "Kalinga University", n: "04", stat: "9.46", size: "36cqw", lh: 0.8, caption: "CGPA, B.Tech CS (AI/ML), class of 2027", grad: ["#e6f9ab", "#a8e05c", "#4fbf6a"] },
};

/* ------------------------------ puzzle maths ------------------------------ */

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

/* one jigsaw edge from (x0,y0) to (x1,y1); s = which way the tab points, 0 = flat */
function edge(x0: number, y0: number, x1: number, y1: number, s: number, T: number) {
  if (!s) return ` L${x1.toFixed(1)} ${y1.toFixed(1)}`;
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = dy / L, ny = -dx / L, f = 0.62;
  const P = (t: number, k: number) => `${(x0 + dx * t + nx * k * f * T * s).toFixed(1)} ${(y0 + dy * t + ny * k * f * T * s).toFixed(1)}`;
  return ` L${P(0.36, 0)} C${P(0.4, 0)} ${P(0.43, 0.1)} ${P(0.39, 0.17)} C${P(0.33, 0.27)} ${P(0.4, 0.36)} ${P(0.5, 0.36)} C${P(0.6, 0.36)} ${P(0.67, 0.27)} ${P(0.61, 0.17)} C${P(0.57, 0.1)} ${P(0.6, 0)} ${P(0.64, 0)} L${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

/* C×R jigsaw cut of a W×H box as SVG paths; outer edges pushed out by M */
function jigsaw(W: number, H: number, C: number, R: number, M: number) {
  const w = W / C, h = H / R, T = Math.min(w, h);
  const sg = () => (Math.random() < 0.5 ? 1 : -1);
  const Hs: number[][] = [], Vs: number[][] = [];
  for (let r = 0; r <= R; r++) {
    Hs[r] = [];
    Vs[r] = [];
    for (let c = 0; c <= C; c++) { Hs[r][c] = sg(); Vs[r][c] = sg(); }
  }
  const out: { r: number; c: number; d: string; cx: number; cy: number }[] = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const x0 = c === 0 ? -M : c * w, x1 = c === C - 1 ? W + M : (c + 1) * w;
    const y0 = r === 0 ? -M : r * h, y1 = r === R - 1 ? H + M : (r + 1) * h;
    const sT = r > 0 ? -Hs[r][c] : 0, sB = r < R - 1 ? Hs[r + 1][c] : 0, sL = c > 0 ? -Vs[r][c] : 0, sR = c < C - 1 ? Vs[r][c + 1] : 0;
    const d = `M${x0} ${y0}` + edge(x0, y0, x1, y0, sT, T) + edge(x1, y0, x1, y1, sR, T) + edge(x1, y1, x0, y1, sB, T) + edge(x0, y1, x0, y0, sL, T) + " Z";
    out.push({ r, c, d, cx: (c + 0.5) * w, cy: (r + 0.5) * h });
  }
  return out;
}

/* procedural textures for the card glitter */
function glitterTex(seed: number) {
  const S = 200, c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d")!;
  let r = seed;
  const R = () => (r = (r * 16807) % 2147483647) / 2147483647;
  const tints = ["255,255,255", "255,255,255", "255,255,255", "255,214,240", "210,240,255", "255,240,200"];
  for (let i = 0; i < 70; i++) {
    const px = R() * S, py = R() * S, sz = 0.35 + Math.pow(R(), 3) * 1.6, a = 0.5 + R() * 0.5, t = tints[Math.floor(R() * tints.length)];
    const g = x.createRadialGradient(px, py, 0, px, py, sz * 2.6);
    g.addColorStop(0, `rgba(${t},${a})`);
    g.addColorStop(0.35, `rgba(${t},${a * 0.6})`);
    g.addColorStop(1, `rgba(${t},0)`);
    x.fillStyle = g;
    x.beginPath();
    x.arc(px, py, sz * 2.6, 0, Math.PI * 2);
    x.fill();
    if (sz > 1.35) {
      x.strokeStyle = `rgba(${t},${a * 0.8})`;
      x.lineWidth = 0.6;
      x.beginPath();
      x.moveTo(px - sz * 5, py); x.lineTo(px + sz * 5, py);
      x.moveTo(px, py - sz * 5); x.lineTo(px, py + sz * 5);
      x.stroke();
    }
  }
  return c.toDataURL();
}

function grainTex() {
  const S = 140, c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d")!, im = x.createImageData(S, S);
  for (let i = 0; i < im.data.length; i += 4) {
    im.data[i] = im.data[i + 1] = im.data[i + 2] = Math.random() * 255;
    im.data[i + 3] = 46;
  }
  x.putImageData(im, 0, 0);
  return c.toDataURL();
}

/* ------------------------------- components ------------------------------- */

/* side gutter: 5vw, widening on very large screens so content tops out at 1400px */
const GX = "max(5vw, calc((100% - 1400px) / 2))";
const GRID = "repeat(auto-fit,minmax(min(100%,440px),1fr))";
const SECTION: CSSProperties = { position: "relative", minHeight: "100vh", boxSizing: "border-box", padding: `14vh ${GX}`, display: "grid", gridTemplateColumns: GRID, gap: "64px 6vw", alignItems: "center" };
const COLUMN: CSSProperties = { display: "flex", flexDirection: "column", gap: 32, minWidth: 0 };
const TAG: CSSProperties = { fontFamily: MONO, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" };
const H2: CSSProperties = { margin: 0, fontWeight: 600, fontSize: "clamp(46px,5.4vw,100px)", lineHeight: 0.92, letterSpacing: "-0.045em", textWrap: "balance" };
const BTN: CSSProperties = { display: "flex", alignItems: "center", height: 54, borderRadius: 999, fontWeight: 500, fontSize: 16 };
const BTN_SOLID: CSSProperties = { ...BTN, padding: "0 26px", background: INK, color: "#fff" };
const BTN_LINE: CSSProperties = { ...BTN, padding: "0 24px", border: `1.5px solid ${INK}` };

const cardStyle = (t: Tone): CSSProperties => ({
  position: "relative", display: "flex", flexDirection: "column", borderRadius: 22, isolation: "isolate",
  background: `${GLOW}, linear-gradient(135deg, ${t.card})`,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 18px 40px -26px rgba(${t.shadow},0.45)`,
});

/* the photo board when `art` is absent */
function Board({ art }: { art?: Art }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
      {/* 62vh keeps the whole board on screen in landscape phones */}
      <div data-board style={{ position: "relative", width: "min(410px,78vw,62vh)", aspectRatio: "4/5" }}>
        {art ? (
          <div data-art data-grad={art.grad.join(" ")} style={{ position: "absolute", inset: 0, containerType: "size", overflow: "hidden", background: `${GLOW}, linear-gradient(150deg, ${art.grad[0]} 0%, ${art.grad[1]} 48%, ${art.grad[2]} 100%)` }}>
            <div style={{ position: "absolute", left: "8cqw", right: "8cqw", top: "8cqw", display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: "3.6cqw", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <span>{art.label}</span>
              <span>{art.n}</span>
            </div>
            <div style={{ position: "absolute", left: "7cqw", right: "7cqw", bottom: "8cqw", display: "flex", flexDirection: "column", gap: "4cqw" }}>
              <span style={{ fontWeight: 600, fontSize: art.size, lineHeight: art.lh, letterSpacing: "-0.055em" }}>{art.stat}</span>
              <span style={{ maxWidth: "66cqw", fontSize: "5.4cqw", lineHeight: 1.2 }}>{art.caption}</span>
            </div>
          </div>
        ) : (
          <div data-art style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#cfe3b0" }}>
            <img src={profilePhoto} alt="Shri Ram Dwivedi" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 32%" }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* role / project card; links get a tighter fit and slide on hover */
function Card({ tone, name, meta, body, href }: Entry & { tone: Tone }) {
  const style = { ...cardStyle(tone), gap: href ? 10 : 12, padding: href ? "22px 28px" : "26px 28px", "--knob": tone.knob } as CSSProperties;
  const inner = (
    <>
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: href ? undefined : "wrap" }}>
        <span style={{ fontWeight: 600, fontSize: 26, letterSpacing: "-0.035em" }}>{name}</span>
        <span style={{ fontSize: 14, color: tone.meta }}>{meta}</span>
      </div>
      <p style={{ position: "relative", margin: 0, fontSize: 16, lineHeight: 1.55, color: tone.text, textWrap: "pretty" }}>{body}</p>
    </>
  );
  return href ? (
    <a data-reveal data-card href={href} target="_blank" rel="noreferrer" className="knob lift" style={style}>{inner}</a>
  ) : (
    <article data-reveal data-card className="knob" style={style}>{inner}</article>
  );
}

/* board on one side, label + heading + content on the other */
function Split({ id, tint, tone, tag, title, art, textFirst, children }: {
  id?: string; tint: string; tone: Tone; tag: string; title: string; art: Art; textFirst?: boolean; children: ReactNode;
}) {
  const text = (
    <div style={COLUMN}>
      <div data-reveal style={{ ...TAG, color: tone.tag }}>{tag}</div>
      <h2 data-reveal style={H2}>{title}</h2>
      {children}
    </div>
  );
  return (
    <section id={id} data-sec data-tint={tint} style={SECTION}>
      {textFirst ? <>{text}<Board art={art} /></> : <><Board art={art} />{text}</>}
    </section>
  );
}

/* --------------------------------- page ----------------------------------- */

type Piece = { el: HTMLElement; face: HTMLElement; url: string; r: number; c: number; d: number; sx: number; sy: number; rz: number; rx: number; ix: number; iy: number; irz: number; idl: number };
type Block = { el: HTMLElement; ov: HTMLElement; pieces: { el: HTMLElement; d: number; sx: number; sy: number; rz: number }[]; on: boolean; a: number };

const Index = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  // layout effect: the hero text must be hidden before the first paint, then assemble in
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const qa = (s: string, from: ParentNode = root) => Array.from(from.querySelectorAll<HTMLElement>(s));
    const secs = qa("[data-sec]");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // no puzzle, no smooth scroll: each section just wears its tint
      secs.forEach((s) => (s.style.background = s.dataset.tint!));
      return;
    }

    const n = secs.length;
    const tints = secs.map((s) => s.dataset.tint!);
    const boards = secs.map((s) => s.querySelector<HTMLElement>("[data-board]")!);
    const arts = boards.map((b) => b.querySelector<HTMLElement>("[data-art]")!);
    const [bgA, bgB] = qa("[data-bg]");
    const box = root.querySelector<HTMLElement>("[data-puzzle]")!;
    const ring = root.querySelector<HTMLElement>("[data-cursor-ring]")!;
    const dot = root.querySelector<HTMLElement>("[data-cursor-dot]")!;
    let dead = false, raf = 0, rz = 0, idleT = 0, introAt = 0, lastW = innerWidth;

    /* geometry in page coordinates, measured up front so the frame loop never reads layout */
    let secY: number[] = [], boardAt: { x: number; y: number; w: number; h: number }[] = [], lite = false;
    const measure = () => {
      secY = secs.map((s) => s.getBoundingClientRect().top + scrollY);
      boardAt = boards.map((b) => {
        const r = b.getBoundingClientRect();
        return { x: r.left, y: r.top + scrollY, w: r.width, h: r.height };
      });
      lite = innerWidth < 720 || matchMedia("(pointer: coarse)").matches; // phones: fewer, bigger pieces
    };
    measure();

    /* smooth scroll; in-page links glide to their section */
    const lenis = new Lenis({ duration: 1.1 });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]');
      const to = a && document.querySelector<HTMLElement>(a.getAttribute("href")!);
      if (!to) return;
      e.preventDefault();
      lenis.scrollTo(to, { duration: 2, easing: (x) => 1 - Math.pow(1 - x, 4) });
    };
    document.addEventListener("click", onClick, true);

    /* custom cursor, mouse only */
    const cursor = matchMedia("(pointer: fine)").matches;
    const m = { cx: -999, cy: -999, rx: innerWidth / 2, ry: innerHeight / 2, s: 1, hover: false };
    let curStyle: HTMLStyleElement | undefined;
    if (cursor) {
      ring.style.display = dot.style.display = "";
      curStyle = document.head.appendChild(document.createElement("style"));
      curStyle.textContent = "*{cursor:none!important}";
    }
    const onMove = (e: MouseEvent) => { m.cx = e.clientX; m.cy = e.clientY; };
    const onOver = (e: MouseEvent) => { m.hover = !!(e.target as Element).closest?.("a,button"); };
    addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);

    /* glitter: shared textures, CSS opacity/transform loops (keyframes in index.css) */
    const rootStyle = document.documentElement.style;
    if (!rootStyle.getPropertyValue("--glitA")) {
      rootStyle.setProperty("--grain", `url(${grainTex()})`);
      rootStyle.setProperty("--glitA", `url(${glitterTex(7)})`);
      rootStyle.setProperty("--glitB", `url(${glitterTex(1931)})`);
    }
    qa("[data-card]").forEach((card, i) => {
      qa("[data-glit]", card).forEach((g) => g.remove());
      const layer = (css: string) => {
        const d = document.createElement("div");
        d.setAttribute("data-glit", "");
        d.style.cssText = "position:absolute;inset:0;border-radius:inherit;pointer-events:none;" + css;
        card.prepend(d);
        return d;
      };
      const dur = 1.1 + (i % 4) * 0.3;
      layer("overflow:hidden;").appendChild(document.createElement("div")).style.cssText =
        `position:absolute;top:0;bottom:0;left:-60%;width:60%;background:linear-gradient(105deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.45) 50%,rgba(255,255,255,0) 100%);animation:sheen ${5 + (i % 3)}s cubic-bezier(.45,0,.55,1) ${i * 0.3}s infinite;`;
      layer(`background-image:var(--glitB);background-size:190px 190px;background-position:37px 61px;opacity:.35;animation:glitB ${dur * 1.2}s ease-in-out .4s infinite alternate;`);
      layer(`background-image:var(--glitA);background-size:200px 200px;opacity:.9;animation:glitA ${dur}s ease-in-out infinite alternate;`);
      layer("background-image:var(--grain);background-size:140px 140px;mix-blend-mode:overlay;opacity:.85;");
    });

    /* rasterise each board once, so puzzle pieces are just clipped backgrounds */
    let urls: string[] = [];
    const renderArts = async () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      const dpr = Math.min(devicePixelRatio || 1, 2);
      urls = await Promise.all(arts.map(async (art) => {
        const r = art.getBoundingClientRect(), W = r.width, H = r.height;
        const cv = document.createElement("canvas");
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
        const x = cv.getContext("2d")!;
        x.scale(dpr, dpr);
        const img = art.querySelector("img");
        if (img) {
          await img.decode().catch(() => {});
          const iw = img.naturalWidth, ih = img.naturalHeight, sc = Math.max(W / (iw || 1), H / (ih || 1));
          x.fillStyle = "#cfe3b0";
          x.fillRect(0, 0, W, H);
          if (iw) x.drawImage(img, (W - iw * sc) * 0.5, (H - ih * sc) * 0.32, iw * sc, ih * sc);
        } else {
          // linear-gradient(150deg, c0 0%, c1 48%, c2 100%) …
          const cols = art.dataset.grad!.split(" ");
          const a = (150 * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a), L = Math.abs(W * dx) + Math.abs(H * dy);
          const g = x.createLinearGradient(W / 2 - (dx * L) / 2, H / 2 - (dy * L) / 2, W / 2 + (dx * L) / 2, H / 2 + (dy * L) / 2);
          [0, 0.48, 1].forEach((s, i) => g.addColorStop(s, cols[i]));
          x.fillStyle = g;
          x.fillRect(0, 0, W, H);
          // … under GLOW: an ellipse 120% × 90% of the box, white .6 fading out at 55%
          x.save();
          x.scale(1.2 * W, 0.9 * H);
          const rg = x.createRadialGradient(0, 0, 0, 0, 0, 1);
          rg.addColorStop(0, "rgba(255,255,255,0.6)");
          rg.addColorStop(0.55, "rgba(255,255,255,0)");
          x.fillStyle = rg;
          x.fillRect(0, 0, 1, 1);
          x.restore();
          // every word, drawn where the browser laid it out
          const tw = document.createTreeWalker(art, NodeFilter.SHOW_TEXT), range = document.createRange();
          while (tw.nextNode()) {
            const t = tw.currentNode, cs = getComputedStyle(t.parentElement!);
            x.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
            x.fillStyle = cs.color;
            x.textBaseline = "middle";
            x.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
            for (const w of t.nodeValue!.matchAll(/\S+/g)) {
              range.setStart(t, w.index!);
              range.setEnd(t, w.index! + w[0].length);
              const rr = range.getClientRects()[0];
              if (rr) x.fillText(cs.textTransform === "uppercase" ? w[0].toUpperCase() : w[0], rr.left - r.left, rr.top - r.top + rr.height / 2);
            }
          }
        }
        const blob = await new Promise<Blob | null>((res) => cv.toBlob(res, img ? "image/jpeg" : "image/png", 0.9));
        return URL.createObjectURL(blob!);
      }));
    };

    /* one jigsaw (6×7, 4×5 on phones) travels board to board, flipping from one art to the next.
       Pieces live in page coordinates, so the compositor scrolls them; only the flight is scripted. */
    let pieces: Piece[] = [], BW = 0, cw = 0, ch = 0, EW = 0, EH = 0;
    let lastK = -1, lastE = -1, lastIv = -1, lastRest: boolean | null = null, lastRestK = -1;
    const buildPuzzle = () => {
      box.innerHTML = "";
      const [C, R] = lite ? [4, 5] : [6, 7], BH = boardAt[0].h;
      BW = boardAt[0].w;
      cw = BW / C;
      ch = BH / R;
      const pad = Math.ceil(Math.min(cw, ch) * 0.26);
      EW = cw + 2 * pad;
      EH = ch + 2 * pad;
      const rnd = () => Math.random() - 0.5;
      pieces = jigsaw(BW, BH, C, R, 0).map((j) => {
        // the piece is the GPU layer; its jigsaw clip sits on a plain child so it's painted in, not masked per frame
        const el = box.appendChild(document.createElement("div"));
        el.style.cssText = `position:absolute;left:0;top:0;width:${EW}px;height:${EH}px;will-change:transform;`;
        // path relative to the piece box
        const d = j.d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, a, b) => `${(+a - j.c * cw + pad).toFixed(1)} ${(+b - j.r * ch + pad).toFixed(1)}`);
        const face = el.appendChild(document.createElement("div"));
        face.style.cssText = `position:absolute;inset:0;clip-path:path('${d}');-webkit-clip-path:path('${d}');background-repeat:no-repeat;background-size:${BW}px ${BH}px;background-position:${(pad - j.c * cw).toFixed(1)}px ${(pad - j.r * ch).toFixed(1)}px;`;
        return {
          el, face, url: "", r: j.r, c: j.c, d: Math.random() * 0.3, sx: rnd() * 2, sy: rnd() * 2, rz: rnd() * 140, rx: rnd() * 50,
          ix: rnd() * 2, iy: rnd() * 2, irz: rnd() * 220, idl: Math.random() * 0.35,
        };
      });
      lastE = -1;
      lastRest = null;
    };
    // at rest the real boards show; the puzzle only takes over mid-flight (opacity keeps its layers warm)
    const setRest = (rest: boolean, k: number) => {
      if (rest === lastRest && k === lastRestK) return;
      lastRest = rest;
      lastRestK = k;
      box.style.opacity = rest ? "0" : "1";
      arts.forEach((a, i) => (a.style.visibility = !rest && (i === k || i === k + 1) ? "hidden" : ""));
    };
    const placePieces = (k: number, e: number, iv: number, W: number, H: number) => {
      const k2 = Math.min(k + 1, n - 1);
      const A = boardAt[k], B = boardAt[k2], sA = A.w / BW, sB = B.w / BW;
      for (const p of pieces) {
        const ei = ease(clamp((e - p.d) / 0.7));
        const ax = A.x + (p.c + 0.5) * cw * sA, ay = A.y + (p.r + 0.5) * ch * sA;
        const bx = B.x + (p.c + 0.5) * cw * sB, by = B.y + (p.r + 0.5) * ch * sB;
        const lift = Math.sin(Math.PI * ei);
        const ii = 1 - ease(clamp((iv - p.idl) / 0.65));
        const cx = ax + (bx - ax) * ei + p.sx * lift * W * 0.2 + p.ix * ii * W * 0.35;
        const cy = ay + (by - ay) * ei + p.sy * lift * H * 0.22 + p.iy * ii * H * 0.45;
        const s = sA + (sB - sA) * ei;
        // single face: past edge-on it shows the next board, mirrored back by scaleX(-1)
        const flip = ei > 0.5, u = urls[flip ? k2 : k];
        if (p.url !== u) {
          p.url = u;
          p.face.style.backgroundImage = `url(${u})`;
        }
        p.el.style.transform = `translate3d(${(cx - EW / 2).toFixed(1)}px,${(cy - EH / 2).toFixed(1)}px,0) perspective(1600px) translateZ(${(lift * 160).toFixed(0)}px) rotateZ(${(p.rz * lift + p.irz * ii).toFixed(1)}deg) rotateX(${(p.rx * lift).toFixed(1)}deg) rotateY(${(180 * ei).toFixed(1)}deg)${flip ? " scaleX(-1)" : ""} scale(${(s * (1 + 0.1 * lift)).toFixed(3)})`;
        p.el.style.opacity = ii > 0 ? (1 - ii * 0.9).toFixed(3) : "";
      }
    };

    /* text puzzles: every [data-reveal] shatters out / assembles in. While its section is on stage the
       overlay stays mounted (invisible when idle), so its layers are ready before a hand-over starts. */
    let blocks: Record<number, Block[]> = {};
    const resetBlocks = () => {
      blocks = {};
      qa("[data-tov]").forEach((o) => o.remove());
    };
    // opacity rather than visibility:hidden, so screen readers still read the text and its links stay focusable
    const hide = (el: HTMLElement, h: boolean) => {
      el.style.opacity = h ? "0" : "";
      el.style.pointerEvents = h ? "none" : "";
    };
    const setOn = (b: Block, on: boolean) => {
      b.on = on;
      hide(b.el, on);
      b.ov.style.opacity = on ? "1" : "0";
    };
    const blocksFor = (si: number) => {
      if (blocks[si]) return blocks[si];
      const out: Block[] = [];
      qa("[data-reveal]", secs[si]).forEach((el) => {
        const W = el.offsetWidth, H = el.offsetHeight;
        if (!W || !H) return;
        const C = Math.max(2, Math.min(lite ? 3 : 4, Math.round(W / 140))), R = Math.max(1, Math.min(2, Math.round(H / 100)));
        // overlay sits beside el, not inside it, so el can fade out without taking the overlay along
        const ov = document.createElement("div");
        ov.setAttribute("data-tov", "");
        ov.inert = true;
        ov.style.cssText = `position:absolute;left:${el.offsetLeft}px;top:${el.offsetTop}px;width:0;height:0;pointer-events:none;display:none;opacity:0;will-change:opacity;z-index:5;`;
        const proto = el.cloneNode(true) as HTMLElement;
        proto.removeAttribute("data-reveal");
        proto.removeAttribute("id");
        qa("[data-glit]", proto).forEach((g) => g.remove());
        Object.assign(proto.style, { position: "absolute", left: "0", top: "0", margin: "0", width: W + "px", height: H + "px", boxSizing: "border-box", transform: "none", opacity: "1" });
        const ps = jigsaw(W, H, C, R, 40).map((j) => {
          // moving wrapper = GPU layer; the clip sits on a plain child so it's painted into that layer
          const p = ov.appendChild(document.createElement("div"));
          p.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:${j.cx}px ${j.cy}px;will-change:transform,opacity;`;
          const clip = p.appendChild(document.createElement("div"));
          clip.style.cssText = `position:absolute;inset:0;clip-path:path('${j.d}');-webkit-clip-path:path('${j.d}');`;
          clip.appendChild(proto.cloneNode(true));
          const ang = Math.random() * Math.PI * 2, dist = 160 + Math.random() * 360;
          return { el: p, d: Math.random() * 0.35, sx: Math.cos(ang) * dist, sy: Math.sin(ang) * dist * 0.8 + 60, rz: (Math.random() - 0.5) * 160 };
        });
        (el.offsetParent as HTMLElement).appendChild(ov);
        out.push({ el, ov, pieces: ps, on: false, a: -1 });
      });
      return (blocks[si] = out);
    };
    const driveText = (k: number, e: number, iv: number) => {
      for (let i = 0; i < n; i++) {
        const active = i === k || i === k + 1;
        if (!active && !blocks[i]) continue;
        let a = i === k ? e : i === k + 1 ? 1 - e : 1;
        if (i === 0) a = Math.max(a, 1 - iv);
        for (const b of blocksFor(i)) {
          if (!active) {
            // off stage: unmount the overlay, keep the text hidden until its turn
            if (b.a !== -1) { b.ov.style.display = "none"; setOn(b, true); b.a = -1; }
            continue;
          }
          if (b.a < 0) b.ov.style.display = "";
          if (Math.abs(a - b.a) < 0.0015) continue;
          b.a = a;
          const on = a > 0.002;
          if (on !== b.on) setOn(b, on);
          if (!on) continue;
          for (const p of b.pieces) {
            const ai = ease(clamp((a - p.d) / 0.65));
            p.el.style.transform = `translate3d(${(p.sx * ai).toFixed(1)}px,${(p.sy * ai).toFixed(1)}px,0) rotate(${(p.rz * ai).toFixed(1)}deg) scale(${(1 - 0.18 * ai).toFixed(3)})`;
            p.el.style.opacity = (1 - clamp((ai - 0.55) / 0.45)).toFixed(3);
          }
        }
      }
    };

    let bgK = -1, lastO = "";
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      lenis.raf(t);
      // read everything up front: innerWidth/innerHeight/scrollY after a style write force a sync style + layout pass
      const W = innerWidth, H = innerHeight, y = scrollY;
      if (cursor) {
        m.rx += (m.cx - m.rx) * 0.2;
        m.ry += (m.cy - m.ry) * 0.2;
        m.s += ((m.hover ? 1.8 : 1) - m.s) * 0.15;
        ring.style.transform = `translate3d(${m.rx.toFixed(1)}px,${m.ry.toFixed(1)}px,0) scale(${m.s.toFixed(3)})`;
        dot.style.transform = `translate3d(${m.cx}px,${m.cy}px,0)`;
      }
      // k = section we're in, e = 0→1 hand-over to section k+1 (maths on cached positions, no layout reads)
      const eOf = (k: number) => clamp((H * 0.92 - secY[k + 1] + y) / (H * 0.62));
      let k = 0;
      while (k < n - 1 && eOf(k) >= 1) k++;
      const e = k < n - 1 ? eOf(k) : 0;
      const iv = introAt ? 1 - Math.pow(1 - clamp((t - introAt) / 2200), 3) : 0; // intro, power3.out
      // background: two composited colour layers crossfade, so nothing repaints
      if (k !== bgK) {
        bgK = k;
        bgA.style.background = tints[k];
        bgB.style.background = tints[Math.min(k + 1, n - 1)];
        secs.forEach((s, i) => s.classList.toggle("live", i === k || i === k + 1)); // glitter only animates here
      }
      const o = ease(e).toFixed(3);
      if (o !== lastO) bgB.style.opacity = lastO = o;
      driveText(k, e, iv);
      if (!pieces.length) return;
      const rest = e <= 0.0005 && iv >= 0.999;
      setRest(rest, k);
      if (rest || (e === lastE && k === lastK && iv === lastIv)) return;
      lastE = e;
      lastK = k;
      lastIv = iv;
      placePieces(k, e, iv, W, H);
    };
    raf = requestAnimationFrame(loop);

    // boards stay hidden until the puzzle can assemble them; setRest takes over from there
    arts.forEach((a) => (a.style.visibility = "hidden"));
    (async () => {
      try {
        await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]);
        if (dead) return;
        measure(); // the web fonts may have shifted things
        resetBlocks(); // the hero text was measured before the web fonts landed
        await renderArts();
        if (dead) return;
        buildPuzzle();
      } catch (err) {
        console.error(err);
        arts.forEach((a) => (a.style.visibility = "")); // no puzzle: show the boards as they are
      }
      introAt = performance.now() + 100;
      // pre-build the other sections' text puzzles in idle time so scrolling never hitches
      let bi = 1;
      const idle = () => {
        if (dead || bi >= n) return;
        if (!blocks[bi]) blocksFor(bi).forEach((b) => (b.a = -2));
        bi++;
        (window.requestIdleCallback || setTimeout)(idle);
      };
      idleT = window.setTimeout(idle, 2600);
    })();

    const onResize = () => {
      clearTimeout(rz);
      rz = window.setTimeout(async () => {
        measure();
        lastE = -1; // re-place the puzzle on the next frame
        if (innerWidth === lastW) {
          // height-only (mobile URL bar, devtools): sizes hold, sections may have shifted
          Object.values(blocks).flat().forEach((b) => {
            b.ov.style.left = b.el.offsetLeft + "px";
            b.ov.style.top = b.el.offsetTop + "px";
          });
          return;
        }
        lastW = innerWidth;
        resetBlocks();
        await renderArts();
        if (!dead) buildPuzzle();
      }, 250);
    };
    addEventListener("resize", onResize);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      clearTimeout(rz);
      clearTimeout(idleT);
      removeEventListener("resize", onResize);
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
      urls.forEach((u) => URL.revokeObjectURL(u));
      resetBlocks();
      curStyle?.remove();
    };
  }, []);

  return (
    // clip: flying pieces never widen or lengthen the page
    <div ref={rootRef} style={{ position: "relative", overflow: "clip" }}>
      {/* section tint: two colour layers crossfaded by opacity */}
      <div data-bg aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "opacity" }} />
      <div data-bg aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "opacity", opacity: 0 }} />
      <div data-puzzle aria-hidden style={{ position: "absolute", left: 0, top: 0, zIndex: 20, pointerEvents: "none", opacity: 0, willChange: "opacity" }} />
      <div data-cursor-ring style={{ display: "none", position: "fixed", left: 0, top: 0, width: 34, height: 34, margin: "-17px 0 0 -17px", border: `1.5px solid ${INK}`, borderRadius: "50%", zIndex: 300, pointerEvents: "none" }} />
      <div data-cursor-dot style={{ display: "none", position: "fixed", left: 0, top: 0, width: 6, height: 6, margin: "-3px 0 0 -3px", background: INK, borderRadius: "50%", zIndex: 301, pointerEvents: "none" }} />

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: `22px ${GX}`, pointerEvents: "none" }}>
        <a href="#top" className="brand" style={{ pointerEvents: "auto", fontWeight: 600, fontSize: 19, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Shri Ram Dwivedi</a>
        <nav className="nav" style={{
          pointerEvents: "auto", display: "flex", gap: 2, alignItems: "center", height: 46, padding: "0 5px", borderRadius: 999,
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px) saturate(160%)", WebkitBackdropFilter: "blur(18px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.8)", boxShadow: "inset 0 1px 0 #fff, 0 10px 28px -16px rgba(30,25,15,0.35)", fontSize: 14, fontWeight: 500,
        }}>
          {[["#experience", "Work"], ["#projects", "Projects"], ["#toolkit", "Toolkit"]].map(([h, t]) => (
            <a key={h} href={h} className="pill" style={{ padding: "9px 14px", borderRadius: 999 }}>{t}</a>
          ))}
          <a href="#contact" style={{ padding: "9px 16px", borderRadius: 999, background: INK, color: "#fff" }}>Contact</a>
        </nav>
      </header>

      <main id="top" style={{ position: "relative", zIndex: 2 }}>
        <section data-sec data-tint="#f6f3ee" style={{ ...SECTION, padding: `130px ${GX} 10vh` }}>
          <div style={{ ...COLUMN, gap: 30 }}>
            <h1 data-reveal style={{ margin: 0, fontWeight: 600, fontSize: "clamp(68px,9vw,172px)", lineHeight: 0.86, letterSpacing: "-0.05em" }}>Shri Ram<br />Dwivedi</h1>
            <p data-reveal style={{ margin: 0, maxWidth: 440, fontSize: "clamp(18px,1.4vw,21px)", lineHeight: 1.45, letterSpacing: "-0.012em", color: "#34322b", textWrap: "pretty" }}>
              I build AI agents that plan, use tools and remember, then ship them to production for thousands of users.
            </p>
            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href="#experience" style={BTN_SOLID}>See the work</a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" style={BTN_LINE}>Résumé ↗</a>
            </div>
            <div data-reveal style={{ fontSize: 14, color: "#5d5a52" }}>Open to AI engineering roles. Graduating 2027.</div>
          </div>
          <Board />
        </section>

        <Split id="experience" tint="#efebfb" tone={VIOLET} tag="01 · Experience" title="Agents that do the job themselves." art={ART.ryze}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingRight: 16 }}>
            {WORK.map((w) => <Card key={w.name} tone={VIOLET} {...w} />)}
          </div>
        </Split>

        <Split tint="#eaf3fd" tone={BLUE} tag="02 · Perception" title="Machines that see, even inside the body." art={ART.realfy} textFirst>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingRight: 16 }}>
            {VISION.map((w) => <Card key={w.name} tone={BLUE} {...w} />)}
          </div>
        </Split>

        <Split id="projects" tint="#fbf4e1" tone={AMBER} tag="03 · Projects" title="Built, tested, shipped." art={ART.leastwise}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingRight: 16 }}>
            {PROJECTS.map((w) => <Card key={w.name} tone={AMBER} {...w} />)}
          </div>
        </Split>

        <Split id="toolkit" tint="#edf6e4" tone={GREEN} tag="04 · Toolkit" title="The stack behind it." art={ART.kalinga} textFirst>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 16, paddingRight: 16 }}>
            {STACK.map(([k, v]) => (
              <div key={k} data-reveal data-card style={{ ...cardStyle(GREEN), gap: 10, padding: "22px 24px" }}>
                <span style={{ position: "relative", fontWeight: 600, fontSize: 21, letterSpacing: "-0.03em" }}>{k}</span>
                <span style={{ position: "relative", fontSize: 15, lineHeight: 1.5, color: GREEN.text }}>{v}</span>
              </div>
            ))}
          </div>
          <p data-reveal style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: GREEN.text, textWrap: "pretty" }}>
            B.Tech Computer Science (AI/ML), Kalinga University. 1st of 50+ teams at the institutional startup competition. Google Cloud Generative AI Leader.
          </p>
        </Split>

        <section id="contact" data-sec data-tint="#f6f3ee" style={{ position: "relative", minHeight: "100vh", boxSizing: "border-box", padding: `14vh ${GX} 36px`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "8vh" }}>
          <div style={{ display: "grid", gridTemplateColumns: GRID, gap: "64px 6vw", alignItems: "center", flex: 1 }}>
            <Board />
            <div style={{ ...COLUMN, gap: 30 }}>
              <div data-reveal style={{ ...TAG, color: "#5d5a52" }}>05 · Contact</div>
              <h2 data-reveal style={H2}>The last piece is you.</h2>
              <p data-reveal style={{ margin: 0, maxWidth: 440, fontSize: 18, lineHeight: 1.5, color: "#34322b", textWrap: "pretty" }}>
                Hiring for an AI engineering role? I would love to hear what you are building.
              </p>
              <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <a href={`mailto:${EMAIL}`} style={{ ...BTN_SOLID, gap: 10, padding: "0 24px" }}>{EMAIL}</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" style={{ ...BTN_LINE, padding: "0 22px" }}>LinkedIn ↗</a>
                <a href={GITHUB} target="_blank" rel="noreferrer" style={{ ...BTN_LINE, padding: "0 22px" }}>GitHub ↗</a>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20, borderTop: "1px solid rgba(22,21,15,0.15)", paddingTop: 20, fontSize: 14, color: "#5d5a52" }}>
            <span>© 2026 Shri Ram Dwivedi</span>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" style={{ color: INK }}>Download résumé ↗</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
