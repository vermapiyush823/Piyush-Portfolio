"use client";

import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, label, title }: { index: string; label: string; title: React.ReactNode }) {
  return (
    <div className="mb-14 sm:mb-20">
      <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
        <span className="text-mint">{index}</span>
        <span className="h-px w-10 bg-line" />
        {label}
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">{title}</h2>
      </Reveal>
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex shrink-0 animate-marquee gap-10 pr-10 ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-2xl font-medium text-fog/70 sm:text-4xl">
            {item}
            <span className="text-mint">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
