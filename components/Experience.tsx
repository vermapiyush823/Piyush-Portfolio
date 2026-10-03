"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { experience, type Experience as Exp } from "@/data/content";
import Spotlight from "./Spotlight";
import { SectionHeading, ease } from "./ui";

function Entry({ item, index }: { item: Exp; index: number }) {
  return (
    <div className="relative grid gap-6 pl-10 md:grid-cols-[220px_1fr] md:gap-12 md:pl-0">
      {/* node on the spine */}
      <motion.span
        className="absolute left-[7px] top-2 z-10 h-[11px] w-[11px] rounded-full border border-fog/50 bg-ink md:left-[239px]"
        initial={{ scale: 0.6 }}
        whileInView={{ scale: 1, backgroundColor: "#7cffb2", borderColor: "#7cffb2" }}
        viewport={{ margin: "-50% 0px -50% 0px" }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="md:sticky md:top-32 md:self-start md:pr-12 md:text-right"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="font-mono text-xs uppercase tracking-widest text-fog">{item.period}</p>
        <p className="mt-2 text-6xl font-semibold tracking-tighter text-paper/10 md:text-7xl">{item.start}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className=""
      >
        <Spotlight className="rounded-3xl border border-line bg-ink-2/50 p-6 sm:p-8">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-mint">{item.company}</span>
              {item.current && (
                <span className="rounded-full bg-mint/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-mint">
                  Current
                </span>
              )}
              <span className="ml-auto font-mono text-[10px] text-fog/50">0{experience.length - index}</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{item.role}</h3>
            <p className="mt-3 text-fog">{item.summary}</p>

            <ul className="mt-6 space-y-3">
              {item.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-paper/85">
                  <span className="mt-[0.6em] h-1 w-3 shrink-0 bg-mint/60" />
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fog">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Spotlight>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Experience"
          title={
            <>
              From intern to engineer, <span className="text-fog">all at ServiceNow.</span>
            </>
          }
        />

        <div ref={ref} className="relative space-y-20 md:space-y-28">
          {/* spine */}
          <div className="absolute bottom-0 left-[12px] top-2 w-px bg-line md:left-[244px]" />
          <motion.div
            className="absolute bottom-0 left-[12px] top-2 w-px origin-top bg-gradient-to-b from-mint via-sky to-violet md:left-[244px]"
            style={{ scaleY }}
          />
          {experience.map((item, i) => (
            <Entry key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
