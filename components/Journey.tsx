"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { interests, journey } from "@/data/content";
import { ease } from "./ui";

const TAG_COLOR: Record<string, string> = {
  Education: "#ffc876",
  Achievement: "#ff9fc6",
  Craft: "#7cc8ff",
  Career: "#7cffb2",
  Certification: "#62d84e",
  Research: "#b69cff",
  Now: "#7cffb2",
};

/** Pinned section that converts vertical scroll into a horizontal journey. */
export default function Journey() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const lineScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section id="journey" ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-7xl px-5 sm:mb-14 sm:px-8">
          <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            <span className="text-mint">06</span>
            <span className="h-px w-10 bg-line" />
            Learning journey
          </div>
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            How I got here, <span className="text-fog">one commit at a time.</span>
          </h2>
        </div>

        <div className="relative">
          <motion.div ref={track} style={{ x }} className="flex w-max gap-5 px-5 sm:gap-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            {journey.map((j, i) => (
              <motion.article
                key={j.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05, ease }}
                className="relative flex h-[300px] w-[78vw] max-w-[340px] shrink-0 flex-col justify-between rounded-3xl border border-line bg-ink-2/70 p-6 sm:h-[340px] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: TAG_COLOR[j.tag], background: `${TAG_COLOR[j.tag]}14` }}
                  >
                    {j.tag}
                  </span>
                  <span className="font-mono text-[11px] text-fog">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p className="text-6xl font-semibold tracking-tighter text-paper/15">{j.year}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{j.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{j.body}</p>
                </div>
              </motion.article>
            ))}

            <article className="flex h-[300px] w-[85vw] max-w-[440px] shrink-0 flex-col justify-between rounded-3xl border border-mint/30 bg-mint/[0.04] p-6 sm:h-[340px] sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mint">Currently exploring →</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((t) => (
                  <span key={t} className="rounded-full border border-mint/25 px-3 py-1.5 text-sm text-paper/90">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm text-fog">Next chapter: still being written.</p>
            </article>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-5 sm:px-8">
          <div className="relative h-px bg-line">
            <motion.div className="absolute inset-0 origin-left bg-mint" style={{ scaleX: lineScale }} />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[11px] text-fog">
            <span>{journey[0].year}</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
