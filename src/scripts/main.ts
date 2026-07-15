import "../styles/main.css";
import { initHeroCanvas } from "./hero-canvas";

// Mark JS as ready
document.documentElement.classList.add("js-ready");

// ===== Hero Canvas =====
const heroCanvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
let cleanupCanvas: (() => void) | null = null;
if (heroCanvas) {
  cleanupCanvas = initHeroCanvas(heroCanvas);
}

// ===== Navigation scroll state =====
const nav = document.getElementById("nav");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a, .nav-mobile a");

function updateNav() {
  if (!nav) return;
  const scrollY = window.scrollY;
  nav.classList.toggle("scrolled", scrollY > 60);

  let currentSection = "";
  for (const section of sections) {
    const el = section as HTMLElement;
    const top = el.offsetTop - 120;
    if (scrollY >= top) {
      currentSection = el.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");
const mobileLinks = navMobile?.querySelectorAll("a");

navToggle?.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navMobile?.classList.toggle("open");
  document.body.style.overflow = navMobile?.classList.contains("open") ? "hidden" : "";
});

mobileLinks?.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.classList.remove("open");
    navMobile?.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ===== IntersectionObserver for reveal animations =====
const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-left]");

if (revealElements.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("revealed"));
}

// ===== Scanline animation =====
const scanline = document.getElementById("scanline");
if (scanline) {
  const scanObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          scanObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  scanObserver.observe(scanline);
}

// ===== Capability path line activation =====
const capPaths = document.querySelectorAll<HTMLElement>(".cap-path");
if (capPaths.length) {
  const capObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.3 }
  );
  capPaths.forEach((el) => capObserver.observe(el));
}

// ===== Copy email =====
const copyBtn = document.getElementById("copyEmailBtn");
copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("contact@lingscape.ai");
    const original = copyBtn.textContent;
    copyBtn.textContent = "已复制";
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 2000);
  } catch {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = "contact@lingscape.ai";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    const original = copyBtn.textContent;
    copyBtn.textContent = "已复制";
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 2000);
  }
});

// ===== Cleanup on page unload (SPA-like) =====
window.addEventListener("beforeunload", () => {
  cleanupCanvas?.();
});
