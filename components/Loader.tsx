"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";

const BOOT_LINES = [
  "init runtime",
  "load agents: planner · analyst · builder · reviewer",
  "index experience graph",
  "compile portfolio",
];

/** Boot-sequence loader. Plays fully on first visit per session, briefly afterwards. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("pv-booted") === "1";
      sessionStorage.setItem("pv-booted", "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 200 : seen ? 600 : 2000;

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-in-out so the counter stalls briefly mid-way, like a real boot
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 250);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        onDone();
      }}
    >
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 font-mono text-xs text-fog sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between">
            <span>{profile.name.toLowerCase().replace(" ", "_")}.portfolio</span>
            <span>v2026</span>
          </div>

          <div className="space-y-1.5">
            {BOOT_LINES.map((line, i) => {
              const done = progress >= ((i + 1) / BOOT_LINES.length) * 100 - 1;
              const active = !done && progress >= (i / BOOT_LINES.length) * 100;
              return (
                <div key={line} className={done || active ? "opacity-100" : "opacity-20"}>
                  <span className={done ? "text-mint" : "text-fog"}>{done ? "✓" : active ? "›" : "·"}</span>{" "}
                  {line}
                  {active && <span className="ml-1 inline-block animate-blink">_</span>}
                </div>
              );
            })}
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 overflow-hidden bg-line">
              <div className="h-full bg-mint transition-[width] duration-75" style={{ width: `${progress}%` }} />
            </div>
            <span className="font-display text-7xl font-medium tabular-nums text-paper sm:text-9xl">
              {progress}
              <span className="text-mint">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
