"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import AgentGraph from "./AgentGraph";
import { scrollToId, useLenis } from "./SmoothScroll";

const ROTATING = ["AI agents", "developer tools", "TypeScript DSLs", "platform software"];

function SplitWord({ text, ready, delay = 0 }: { text: string; ready: boolean; delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%", rotate: 8 }}
          animate={ready ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATING[i]}
          className="col-start-1 row-start-1 whitespace-nowrap text-mint"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Scroll-driven choreography: names pull apart, content recedes, graph zooms.
  const leftX = useTransform(p, [0, 1], ["0%", "-35%"]);
  const rightX = useTransform(p, [0, 1], ["0%", "35%"]);
  const scale = useTransform(p, [0, 1], [1, 0.82]);
  const opacity = useTransform(p, [0, 0.75], [1, 0]);
  const blur = useTransform(p, [0, 1], ["blur(0px)", "blur(10px)"]);
  const graphScale = useTransform(p, [0, 1], [1, 1.4]);
  const metaY = useTransform(p, [0, 1], [0, -120]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" ref={ref} className="relative h-[170vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: graphScale }}>
          <div className="grid-bg absolute inset-0" />
          <AgentGraph />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-ink)_80%)]" />
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-8"
          style={{ scale, opacity, filter: blur }}
        >
          <motion.div {...fadeUp(0.2)} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-3 py-1.5 font-mono text-[11px] text-fog backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              {profile.role} @ {profile.company}
            </span>
            <span className="hidden font-mono text-[11px] text-fog sm:inline">— open to collaborating</span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.6rem,19vw,13rem)] font-semibold leading-[0.86] tracking-[-0.045em]">
            <motion.span className="block" style={{ x: leftX }}>
              <SplitWord text={profile.firstName} ready={ready} delay={0.1} />
            </motion.span>
            <motion.span className="block pl-[8vw] sm:pl-[18vw]" style={{ x: rightX }}>
              <span className="text-stroke">
                <SplitWord text={profile.lastName} ready={ready} delay={0.35} />
              </span>
              <motion.span
                className="ml-2 inline-block h-[0.14em] w-[0.14em] rounded-full bg-mint align-baseline"
                initial={{ scale: 0 }}
                animate={ready ? { scale: 1 } : undefined}
                transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
              />
            </motion.span>
          </h1>

          <motion.div style={{ y: metaY }} className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-[1fr_auto] md:items-end">
            <motion.p {...fadeUp(0.9)} className="max-w-xl text-lg leading-relaxed text-fog sm:text-xl">
              I build <RotatingWord /> <br className="hidden sm:block" />
              that help thousands of engineers ship better code — currently at{" "}
              <span className="text-paper">ServiceNow</span>.
            </motion.p>

            <motion.div {...fadeUp(1.05)} className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToId(lenis, "projects")}
                data-cursor="View"
                className="group relative overflow-hidden rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink"
              >
                <span className="relative z-10">See my work</span>
                <span className="absolute inset-0 translate-y-full bg-mint transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
              </button>
              <button
                onClick={() => scrollToId(lenis, "contact")}
                className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-paper/40"
              >
                Get in touch
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          {...fadeUp(1.3)}
          className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pb-6 font-mono text-[11px] text-fog sm:px-8"
        >
          <span>Scroll to explore</span>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-mint"
              animate={{ y: [-16, 40] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </span>
          <span>{profile.location}</span>
        </motion.div>
      </div>
    </section>
  );
}
