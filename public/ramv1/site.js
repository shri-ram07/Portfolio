/* RamV1 showcase: a scroll-driven camera that flies through the architecture, level by level,
   with a code card for every stop; then the loss chart, the typewriter and the tour. */
(() => {
  'use strict';

  // ---- tuning knobs ----------------------------------------------------------
  const TOUR = {
    speed: 1,                 // multiplies every hold below; 0.7 gives a shorter video
    hold: { home: 2800, intro: 3800, stop: 2500, minor: 2000, outro: 2600, chart: 4200, term: 7800, lesson: 2400, end: 3000 },
    pxPerSecond: 1300,        // glide speed between stops
    minGlide: 950,
    maxGlide: 2000,
    autoStartDelay: 1000,     // ms before a #tour link starts on its own
  };
  const CAMERA = { smoothing: 0.12, pad: 0.16, maxZoomWide: 3.0, maxZoomNarrow: 2.6 };   // max zoom in px per diagram unit
  const TYPE_CPS = 45;        // typewriter characters per second

  const root = document.documentElement;
  const svg = document.getElementById('arch');
  const stage = document.querySelector('.stage');
  const crumb = document.querySelector('.crumb');
  if (!svg || !stage) return;
  root.classList.add('js');

  const narrow = matchMedia('(max-width: 899px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const FULL = 'full';
  const [VX, VY, VW, VH] = svg.getAttribute('viewBox').split(/\s+/).map(Number);

  // soft glow behind every box: a wide, faint copy of its outline
  for (const box of svg.querySelectorAll('rect.box')) {
    const halo = box.cloneNode();
    halo.setAttribute('class', 'halo');
    box.before(halo);
  }

  // ---- camera -------------------------------------------------------------------
  const targetEl = name => (name === FULL ? null
    : svg.querySelector(`[data-cam="${name}"]`) || svg.querySelector(`[data-part="${name}"]`));

  const boxes = new Map();
  function bbox(name) {
    if (name === FULL) return { x: VX, y: VY, w: VW, h: VH };
    if (boxes.has(name)) return boxes.get(name);
    const el = targetEl(name);
    if (!el) return bbox(FULL);
    const hint = el.querySelector(':scope > .frame-hint');
    const b = (hint || el).getBBox();
    const r = { x: b.x, y: b.y, w: b.width, h: b.height };
    boxes.set(name, r);
    return r;
  }

  // where on the stage (in px) the target should land: the whole screen at home,
  // otherwise the space the code card leaves free
  function focusRect(home) {
    const W = stage.clientWidth, H = stage.clientHeight;
    if (home) return { x: W * .04, y: H * .04, w: W * .92, h: H - 170 - H * .04 };   // leave room for the landing controls
    if (narrow.matches) return { x: W * .04, y: H * .05, w: W * .92, h: H * .42 };
    const card = Math.min(640, W * .4) + W * .04;
    return { x: W * .04, y: H * .08, w: W - card - W * .1, h: H * .84 };
  }

  function camFor(name, home) {
    const b = bbox(name), f = focusRect(home), H = stage.clientHeight;
    const pad = name === FULL ? 0 : CAMERA.pad;
    const cap = narrow.matches ? CAMERA.maxZoomNarrow * Math.min(H, 900) / 900 : CAMERA.maxZoomWide * H / 1000;
    const s = Math.min(f.w / (b.w * (1 + 2 * pad)), f.h / (b.h * (1 + 2 * pad)), cap);
    return { cx: b.x + b.w / 2, cy: b.y + b.h / 2, ls: Math.log(s), fx: f.x + f.w / 2, fy: f.y + f.h / 2 };
  }

  let lastViewBox = '';
  function apply(c) {
    const W = stage.clientWidth, H = stage.clientHeight, s = Math.exp(c.ls);
    const x = c.cx - c.fx / s, y = c.cy - c.fy / s;
    const vb = `${x.toFixed(2)} ${y.toFixed(2)} ${(W / s).toFixed(2)} ${(H / s).toFixed(2)}`;
    if (vb === lastViewBox) return;
    lastViewBox = vb;
    svg.setAttribute('viewBox', vb);
    stage.style.setProperty('--gs', `${(24 * s).toFixed(2)}px`);
    stage.style.setProperty('--gx', `${(-x * s).toFixed(1)}px`);
    stage.style.setProperty('--gy', `${(-y * s).toFixed(1)}px`);
  }

  const KEYS = ['cx', 'cy', 'ls', 'fx', 'fy'];
  const lerpCam = (a, b, t) => Object.fromEntries(KEYS.map(k => [k, a[k] + (b[k] - a[k]) * t]));
  let keys = [];

  function camAt(y) {
    if (!keys.length) return camFor(FULL, true);
    if (y <= keys[0].y) return keys[0].cam;
    for (let i = 1; i < keys.length; i++) {
      if (y >= keys[i].y) continue;
      const a = keys[i - 1], b = keys[i];
      if (a.cam === b.cam) return a.cam;
      const t = (y - a.y) / (b.y - a.y || 1);
      if (reduced.matches) return t < .5 ? a.cam : b.cam;   // cut instead of fly
      return lerpCam(a.cam, b.cam, t * t * (3 - 2 * t));
    }
    return keys[keys.length - 1].cam;
  }

  let cur = null, raf = 0, lastT = 0;
  function tick(t) {
    raf = 0;
    const target = camAt(scrollY);
    const dt = lastT ? Math.min(.064, (t - lastT) / 1000) : 1 / 60;
    lastT = t;
    if (!cur || reduced.matches) cur = { ...target };
    else {
      const k = 1 - Math.exp(-dt / CAMERA.smoothing);
      for (const p of KEYS) cur[p] += (target[p] - cur[p]) * k;
    }
    const settled = KEYS.every(p => Math.abs(target[p] - cur[p]) < (p === 'ls' ? 5e-4 : .05));
    if (settled) cur = { ...target };
    apply(cur);
    if (settled) lastT = 0;
    else raf = requestAnimationFrame(tick);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  // ---- code snippets: dedent, highlight, number --------------------------------------
  const range = s => { const [a, b] = String(s).split('-').map(Number); return [a, Number.isFinite(b) ? b : a]; };
  const esc = t => t.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const highlight = t => (window.Prism && Prism.languages && Prism.languages.python
    ? Prism.highlight(t, Prism.languages.python, 'python') : esc(t));
  const lead = t => t.length - t.trimStart().length;

  function enhanceSnippets(card) {
    const pres = [...card.querySelectorAll('pre.snip')];
    if (!pres.length) return;
    const lines = pres.map(p => p.textContent.replace(/\n+$/, '').split('\n'));
    const indents = lines.flat().filter(t => t.trim()).map(lead);
    const cut = indents.length ? Math.min(...indents) : 0;      // shift the snippet left, keep relative indents
    const body = document.createElement('div');
    body.className = 'code-body';
    pres.forEach((pre, i) => {
      if (i) {
        const gap = document.createElement('div');
        gap.className = 'ln-gap';
        gap.setAttribute('aria-hidden', 'true');
        body.append(gap);
      }
      const start = range(pre.dataset.lines)[0];
      lines[i].forEach((raw, k) => {
        const text = raw.slice(Math.min(cut, lead(raw)));
        const ln = document.createElement('div');
        ln.className = 'ln';
        ln.dataset.n = start + k;
        ln.style.setProperty('--ind', lead(text));
        ln.innerHTML = text.trim() ? highlight(text) : '​';
        body.append(ln);
      });
    });
    pres[0].before(body);
    pres.forEach(p => p.remove());
  }
  document.querySelectorAll('.stop .card').forEach(enhanceSnippets);

  // ---- stops -----------------------------------------------------------------------------
  const stops = [...document.querySelectorAll('.stop')].map(el => {
    const parts = el.dataset.path ? el.dataset.path.split('/') : [];
    return {
      el, parts,
      target: parts.length ? parts[parts.length - 1] : FULL,
      home: el.classList.contains('home'),
      kind: el.classList.contains('home') ? 'home' : el.classList.contains('intro') ? 'intro'
        : el.classList.contains('outro') ? 'outro' : el.classList.contains('minor') ? 'minor' : 'stop',
      crumb: el.dataset.crumb || '',
    };
  });

  // the deepest level two stops share: the camera pulls back to it between them
  function common(a, b) {
    let i = 0;
    while (i < a.parts.length && i < b.parts.length && a.parts[i] === b.parts[i]) i++;
    return i ? a.parts[i - 1] : FULL;
  }

  const docTop = el => el.getBoundingClientRect().top + scrollY;
  let RL = 0;   // the reading line: middle of the viewport

  function measure() {
    RL = innerHeight * .5;
    boxes.clear();
    keys = [];
    let prev = null;
    stops.forEach((s, i) => {
      s.top = docTop(s.el);
      s.bottom = s.top + s.el.offsetHeight;
      const h = s.bottom - s.top;
      s.hold0 = i === 0 ? 0 : s.top - RL + h * .22;
      s.hold1 = Math.max(s.hold0, s.bottom - RL - h * .22);
      const cam = camFor(s.target, s.home);
      if (prev) {
        const via = common(prev, s);
        if (via !== prev.target && via !== s.target) {
          keys.push({ y: (prev.hold1 + s.hold0) / 2, cam: camFor(via, false) });
        }
      }
      keys.push({ y: s.hold0, cam }, { y: s.hold1, cam });
      prev = s;
    });
  }

  // ---- what is lit right now ----------------------------------------------------------
  function focusNodes(name) {
    const t = targetEl(name);
    for (const node of svg.querySelectorAll('.node')) {
      node.classList.toggle('dim', !!t && !(t.contains(node) || node.contains(t)));
    }
  }

  let active = null;
  function activate(s) {
    if (s === active) return;
    if (active) active.el.classList.remove('on');
    svg.querySelectorAll('.part.lit').forEach(p => p.classList.remove('lit'));
    active = s;
    svg.classList.toggle('fan', !!s && s.target === 'stack');
    if (!s) { focusNodes(FULL); if (crumb) crumb.hidden = true; return; }
    s.el.classList.add('on');
    svg.querySelector(`[data-part="${s.target}"]`)?.classList.add('lit');
    focusNodes(s.target);
    if (crumb) { crumb.textContent = s.crumb; crumb.hidden = !s.crumb || s.home; }
  }

  function updateActive() {
    const y = scrollY + RL;
    let s = null;
    for (const st of stops) if (st.top <= y && y < st.bottom) s = st;
    activate(s);
    root.classList.toggle('at-home', scrollY < innerHeight * .25);
    root.classList.toggle('past-home', scrollY > innerHeight * .6);
  }

  function relayout() {
    measure();
    const keep = active;
    active = null;
    if (keep) keep.el.classList.remove('on');
    updateActive();
    kick();
  }

  // ---- loss chart --------------------------------------------------------------------
  function setupChart() {
    const card = document.querySelector('.chart-card');
    const host = card?.querySelector('.chart-plot');
    if (!host) return;
    const rows = [...card.querySelectorAll('tbody tr')].map(tr => ({
      step: +tr.cells[0].textContent, train: +tr.cells[1].textContent, val: +tr.cells[2].textContent,
    }));
    if (!rows.length) return;
    const W = 640, H = 290, M = { l: 32, r: 132, t: 14, b: 30 };
    const X = s => M.l + s / 3000 * (W - M.l - M.r);
    const Y = v => M.t + (1 - v / 5) * (H - M.t - M.b);
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, attrs, parent, text) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      if (text != null) e.textContent = text;
      parent.append(e);
      return e;
    };
    const s = mk('svg', {
      viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img', tabindex: '0',
      'aria-label': 'Loss over 3,000 steps: train falls from 4.67 to 0.44, validation from 4.66 to 0.59. Focus the chart and use the arrow keys to read each evaluation.',
    }, host);
    for (let v = 0; v <= 5; v++) {
      mk('line', { class: 'grid', x1: M.l, x2: W - M.r, y1: Y(v), y2: Y(v) }, s);
      mk('text', { class: 'tick', x: M.l - 8, y: Y(v) + 4, 'text-anchor': 'end' }, s, v);
    }
    for (const [st, label] of [[0, '0'], [1000, '1K'], [2000, '2K'], [3000, '3K steps']]) {
      mk('text', { class: 'tick', x: X(st), y: H - 8, 'text-anchor': 'middle' }, s, label);
    }
    const ln97 = Math.log(97);
    mk('line', { class: 'ref', x1: M.l, x2: W - M.r, y1: Y(ln97), y2: Y(ln97) }, s);
    mk('text', { class: 'ref-label', x: W - M.r - 4, y: Y(ln97) - 7, 'text-anchor': 'end' }, s, 'uniform guess · ln 97 ≈ 4.57');

    const series = [{ key: 'train', cls: 's1', name: 'train' }, { key: 'val', cls: 's2', name: 'validation' }];
    const paths = series.map(se => mk('path', {
      class: `line ${se.cls}`,
      d: rows.map((r, i) => `${i ? 'L' : 'M'}${X(r.step).toFixed(1)} ${Y(r[se.key]).toFixed(1)}`).join(' '),
    }, s));

    // direct end labels, pulled apart with leader lines
    const last = rows[rows.length - 1], ex = X(last.step);
    const yT = Y(last.train), yV = Y(last.val);
    let lyV = yV - 9, lyT = yT + 13;
    if (lyT - lyV < 22) { const mid = (yT + yV) / 2; lyV = mid - 11; lyT = mid + 11; }
    for (const [se, y, ly] of [[series[0], yT, lyT], [series[1], yV, lyV]]) {
      mk('path', { class: 'leader', d: `M${ex + 6} ${y.toFixed(1)} L${ex + 16} ${(ly - 4).toFixed(1)} H${ex + 22}` }, s);
      const t = mk('text', { class: 'end-label', x: ex + 26, y: ly }, s, last[se.key].toFixed(2));
      mk('tspan', { class: 'end-name', dx: 6 }, t, se.name);
    }
    mk('circle', { class: 'dot s1', cx: ex, cy: yT, r: 4 }, s);
    mk('circle', { class: 'dot s2', cx: ex, cy: yV, r: 4 }, s);

    // crosshair + tooltip (also on keyboard)
    const cross = mk('g', { visibility: 'hidden' }, s);
    const vline = mk('line', { class: 'cross-line', y1: M.t, y2: H - M.b }, cross);
    const d1 = mk('circle', { class: 'dot s1', r: 4 }, cross);
    const d2 = mk('circle', { class: 'dot s2', r: 4 }, cross);
    const hit = mk('rect', { x: M.l, y: M.t, width: W - M.l - M.r, height: H - M.t - M.b, fill: 'transparent' }, s);
    const tip = document.createElement('div');
    tip.className = 'tip';
    tip.hidden = true;
    host.append(tip);
    let idx = -1;
    function show(i) {
      idx = Math.max(0, Math.min(rows.length - 1, i));
      const r = rows[idx], x = X(r.step);
      vline.setAttribute('x1', x); vline.setAttribute('x2', x);
      d1.setAttribute('cx', x); d1.setAttribute('cy', Y(r.train));
      d2.setAttribute('cx', x); d2.setAttribute('cy', Y(r.val));
      cross.setAttribute('visibility', 'visible');
      const head = document.createElement('span');
      head.className = 't-step';
      head.textContent = `step ${r.step.toLocaleString('en-US')}`;
      tip.replaceChildren(head);
      for (const se of series) {
        const row = document.createElement('div');
        row.className = 'row';
        const key = document.createElement('span');
        key.className = `key ${se.cls}`;
        const val = document.createElement('strong');
        val.textContent = r[se.key].toFixed(3);
        row.append(key, val, document.createTextNode(se.name));
        tip.append(row);
      }
      tip.hidden = false;
      const px = x / W * host.clientWidth;
      const w = tip.offsetWidth;
      tip.style.left = `${Math.max(0, px + 14 + w > host.clientWidth ? px - 14 - w : px + 14)}px`;
    }
    const hide = () => { cross.setAttribute('visibility', 'hidden'); tip.hidden = true; };
    const nearest = sx => rows.reduce((best, r, i) => (Math.abs(X(r.step) - sx) < Math.abs(X(rows[best].step) - sx) ? i : best), 0);
    hit.addEventListener('pointermove', e => {
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(s.getScreenCTM().inverse());
      show(nearest(p.x));
    });
    s.addEventListener('pointerleave', hide);
    s.addEventListener('focus', () => show(idx < 0 ? rows.length - 1 : idx));
    s.addEventListener('blur', hide);
    s.addEventListener('keydown', e => {
      const move = { ArrowLeft: -1, ArrowRight: 1, Home: -999, End: 999 }[e.key];
      if (move) { e.preventDefault(); show((idx < 0 ? rows.length - 1 : idx) + move); }
      else if (e.key === 'Escape') hide();
    });

    // the lines draw themselves the first time the chart is seen
    if (!reduced.matches && 'IntersectionObserver' in window) {
      for (const p of paths) {
        const L = p.getTotalLength();
        p.style.strokeDasharray = `${L} ${L}`;
        p.style.strokeDashoffset = `${L}`;
      }
      new IntersectionObserver((entries, io) => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect();
        for (const p of paths) p.style.strokeDashoffset = '0';
      }, { threshold: .3 }).observe(card);
    }
  }

  // ---- generation typewriter --------------------------------------------------------
  function setupTerminal() {
    const term = document.querySelector('.term');
    const out = term?.querySelector('.term-out');
    if (!out) return;
    const full = out.textContent;
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = full;
    const shown = document.createElement('span');
    shown.setAttribute('aria-hidden', 'true');
    const typed = document.createElement('span');
    const caret = document.createElement('span');
    caret.className = 'caret';
    const rest = document.createElement('span');
    rest.className = 'rest';
    shown.append(typed, caret, rest);
    out.replaceChildren(sr, shown);
    const show = n => { typed.textContent = full.slice(0, n); rest.textContent = full.slice(n); };
    show(full.length);
    term.classList.add('done');
    let raf = 0;
    function play() {
      cancelAnimationFrame(raf);
      if (reduced.matches) { show(full.length); term.classList.add('done'); return; }
      term.classList.remove('done');
      const t0 = performance.now();
      const step = t => {
        const n = Math.min(full.length, Math.floor((t - t0) / 1000 * TYPE_CPS));
        show(n);
        if (n < full.length) raf = requestAnimationFrame(step);
        else term.classList.add('done');
      };
      show(0);
      raf = requestAnimationFrame(step);
    }
    term.typewriter = { play, ms: () => full.length / TYPE_CPS * 1000 };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries, io) => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect();
        if (!root.classList.contains('touring')) play();
      }, { threshold: .5 }).observe(term);
    }
  }

  // ---- tour ----------------------------------------------------------------------------
  function setupTour(ready) {
    let run = 0;
    const touring = () => root.classList.contains('touring');
    const wait = (ms, id) => new Promise((resolve, reject) =>
      setTimeout(() => (id === run ? resolve() : reject(new Error('stopped'))), ms * TOUR.speed));
    const glide = (to, id) => new Promise((resolve, reject) => {
      const from = scrollY, dist = Math.abs(to - from);
      if (reduced.matches || dist < 2) { scrollTo(0, to); resolve(); return; }
      const dur = Math.min(TOUR.maxGlide, Math.max(TOUR.minGlide, dist / TOUR.pxPerSecond * 1000));
      const t0 = performance.now();
      const step = t => {
        if (id !== run) { reject(new Error('stopped')); return; }
        const k = Math.min(1, (t - t0) / dur);
        const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        scrollTo(0, from + (to - from) * e);
        if (k < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });

    function plan() {
      relayout();
      const maxY = root.scrollHeight - innerHeight;
      const list = stops.map((s, i) => ({ y: i === 0 ? 0 : (s.hold0 + s.hold1) / 2, hold: TOUR.hold[s.kind] }));
      const chart = document.querySelector('.chart-card');
      if (chart) list.push({ y: docTop(chart) - innerHeight * .12, hold: TOUR.hold.chart });
      const term = document.querySelector('.term');
      if (term) {
        const tw = term.typewriter;
        list.push({ y: docTop(term) - innerHeight * .16, hold: Math.max(TOUR.hold.term, (tw ? tw.ms() : 0) + 1500), arrive: () => tw && tw.play() });
      }
      for (const l of document.querySelectorAll('.lesson')) list.push({ y: docTop(l) - innerHeight * .25, hold: TOUR.hold.lesson });
      list.push({ y: maxY, hold: TOUR.hold.end });
      return list.map(st => ({ ...st, y: Math.round(Math.max(0, Math.min(maxY, st.y))) }));
    }

    async function start() {
      const id = ++run;
      root.classList.add('touring');
      try {
        for (const st of plan()) {
          await glide(st.y, id);
          if (st.arrive) st.arrive();
          await wait(st.hold, id);
        }
      } catch (e) { /* the visitor took over */ }
      if (id === run) stop();
    }
    function stop() { run++; root.classList.remove('touring'); }

    for (const btn of document.querySelectorAll('[data-tour]')) {
      btn.addEventListener('click', () => (touring() ? stop() : start()));
    }
    const interrupt = e => {
      if (!touring()) return;
      if (e.target instanceof Element && e.target.closest('[data-tour]')) return;
      stop();
    };
    for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown']) addEventListener(type, interrupt, { passive: true });

    if (location.hash === '#tour') {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      scrollTo(0, 0);
      ready.then(() => setTimeout(start, TOUR.autoStartDelay));
    }
  }

  // ---- wire it up ------------------------------------------------------------------------
  setupChart();
  setupTerminal();
  relayout();
  const ready = (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(relayout);
  setupTour(ready);

  addEventListener('scroll', () => { updateActive(); kick(); }, { passive: true });
  let timer = 0;
  const later = () => { clearTimeout(timer); timer = setTimeout(relayout, 120); };
  addEventListener('resize', later);
  narrow.addEventListener?.('change', relayout);
  reduced.addEventListener?.('change', relayout);
  if ('ResizeObserver' in window) new ResizeObserver(later).observe(document.body);
})();
