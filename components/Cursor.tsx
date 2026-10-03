"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Two-part cursor: a precise dot plus a lagging ring that grows over
 * interactive elements. Elements can set data-cursor="label" to show text.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, textarea");
      setHover(!!target);
      setLabel(target?.dataset.cursor ?? "");
    };
    const pd = () => setDown(true);
    const pu = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointerup", pu);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hover ? 48 : 30;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-mint"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full border font-mono text-[10px] uppercase tracking-widest text-ink"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.85 : 1,
          backgroundColor: label ? "rgb(124 255 178 / 1)" : hover ? "rgb(124 255 178 / 0.08)" : "rgb(124 255 178 / 0)",
          borderColor: label ? "rgb(124 255 178 / 0)" : "rgb(124 255 178 / 0.55)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {label}
      </motion.div>
    </>
  );
}
