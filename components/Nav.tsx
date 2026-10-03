"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/content";
import { scrollToId, useLenis } from "./SmoothScroll";
import CommandPalette from "./CommandPalette";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const ids = navLinks.map((l) => l.id);

export default function Nav() {
  const lenis = useLenis();
  const active = useActiveSection(ids);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !menuOpen);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(lenis, id);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-colors duration-500 ${
            scrolled ? "border-line bg-ink-2/70 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <button
            onClick={() => go("top")}
            className="group flex items-center gap-2 rounded-full px-3 py-1.5"
            aria-label="Back to top"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-mint font-mono text-xs font-bold text-ink transition-transform group-hover:rotate-[360deg] group-hover:duration-700">
              PV
            </span>
            <span className="hidden text-sm font-medium sm:inline">{profile.firstName}</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active === l.id ? "text-ink" : "text-fog hover:text-paper"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-paper"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fog transition-colors hover:border-mint/50 hover:text-paper sm:flex"
              aria-label="Open command palette"
            >
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="relative h-9 w-9 rounded-full border border-line md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-paper transition-transform ${
                  menuOpen ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-paper transition-transform ${
                  menuOpen ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink/95 px-6 pb-16 backdrop-blur-xl md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <button onClick={() => go(l.id)} className="flex w-full items-baseline gap-4 text-left text-5xl font-medium">
                    <span className="font-mono text-xs text-mint">0{i + 1}</span>
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={go} />
    </>
  );
}
