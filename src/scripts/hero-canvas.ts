const ACCENT = "#35D0A9";
const ACCENT_WARM = "#C8A760";
const LINE = "#333943";
const PANEL = "#111815";

interface Node {
  x: number;
  y: number;
  label: string;
  color: string;
  phase: number;
  pulse: number;
}

export function initHeroCanvas(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let isVisible = true;
  let rafId = 0;
  let time = 0;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    layoutNodes();
  }

  const nodes: Node[] = [];
  function layoutNodes() {
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.3;
    nodes.length = 0;
    const labels = ["文旅", "风控", "乡村", "企业", "AI 底座"];
    const colors = [ACCENT, ACCENT, ACCENT, ACCENT, ACCENT_WARM];
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      nodes.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        label: labels[i],
        color: colors[i],
        phase: (Math.PI * 2 * i) / 5,
        pulse: 0,
      });
    }
  }

  function drawBackground() {
    ctx.fillStyle = PANEL;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = LINE;
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  function drawBoundaries() {
    for (const node of nodes) {
      const pulse = 1 + 0.05 * Math.sin(time * 0.5 + node.phase);
      const radius = 80 * pulse;

      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
      grad.addColorStop(0, node.color + "20");
      grad.addColorStop(0.5, node.color + "10");
      grad.addColorStop(1, node.color + "00");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = node.color + "40";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 0.9, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawPath(time: number) {
    ctx.beginPath();
    ctx.strokeStyle = ACCENT + "60";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    ctx.lineDashOffset = -time * 30;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const b = nodes[(i + 1) % nodes.length];
      const cx = (a.x + b.x) / 2 + (Math.sin(time * 0.3 + i) * 15);
      const cy = (a.y + b.y) / 2 + (Math.cos(time * 0.3 + i) * 15);
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(cx, cy, b.x, b.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawNodes() {
    for (const node of nodes) {
      const glow = 3 + 2 * Math.sin(time * 1.5 + node.phase);

      ctx.shadowColor = node.color;
      ctx.shadowBlur = glow * 4;
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.strokeStyle = node.color + "60";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 8 + 2 * Math.sin(time + node.phase), 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = node.color;
      ctx.font = "11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y - 18);
    }
  }

  function drawParticles(time: number) {
    for (let i = 0; i < 12; i++) {
      const t = ((time * 0.08 + i / 12) % 1);
      const pathIdx = Math.floor(t * nodes.length);
      const frac = (t * nodes.length) % 1;
      const a = nodes[pathIdx % nodes.length];
      const b = nodes[(pathIdx + 1) % nodes.length];
      const px = a.x + (b.x - a.x) * frac + (Math.sin(t * Math.PI * 4) * 8);
      const py = a.y + (b.y - a.y) * frac + (Math.cos(t * Math.PI * 4) * 8);

      const alpha = 1 - Math.abs(frac - 0.5) * 2;
      ctx.fillStyle = ACCENT + Math.round(alpha * 180).toString(16).padStart(2, "0");
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function draw() {
    if (!isVisible) return;
    ctx.clearRect(0, 0, w, h);

    drawBackground();
    drawBoundaries();
    drawPath(time);
    drawNodes();
    drawParticles(time);

    time += 1 / 60;
  }

  function loop() {
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function onVisibilityChange() {
    isVisible = !document.hidden;
    if (isVisible) {
      rafId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(rafId);
    }
  }

  function onReduceMotionChange(e: MediaQueryListEvent | MediaQueryList) {
    if (e.matches) {
      cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, w, h);
      drawBackground();
      drawBoundaries();
      drawNodes();
    } else if (isVisible) {
      rafId = requestAnimationFrame(loop);
    }
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibilityChange);

  const reduceMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduceMotionMq.addEventListener("change", onReduceMotionChange);

  if (!reduceMotion) {
    rafId = requestAnimationFrame(loop);
  } else {
    drawBackground();
    drawBoundaries();
    drawNodes();
  }

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    reduceMotionMq.removeEventListener("change", onReduceMotionChange);
  };
}
