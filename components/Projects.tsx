"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { projects, type Project } from "@/data/content";
import { useLenis } from "./SmoothScroll";
import { SectionHeading, ease } from "./ui";

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/** Animated pipeline: steps joined by a track with a pulse running along it. */
function Pipeline({ steps, accent, compact = false }: { steps: string[]; accent: string; compact?: boolean }) {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-[7px] h-px bg-line" />
      <motion.div
        className="absolute top-[5px] h-[5px] w-16 rounded-full blur-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={{ left: ["-10%", "100%"] }}
        transition={{ duration: compact ? 3 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <motion.span
              className="h-[15px] w-[15px] rounded-full border-2 bg-ink"
              style={{ borderColor: accent }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 300 }}
            />
            {!compact && <span className="font-mono text-[10px] uppercase tracking-wider text-fog">{s}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onOpen, featured }: { project: Project; index: number; onOpen: () => void; featured: boolean }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const rgb = hexToRgb(project.accent);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(${rgb},0.16), transparent 55%)`;

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      className={`${featured ? "md:col-span-2" : ""} rounded-[28px]`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease }}
      style={{ perspective: 1200 }}
    >
      <motion.button
        onClick={onOpen}
        data-cursor="Open"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`group relative flex w-full flex-col overflow-hidden rounded-[28px] border border-line bg-ink-2 p-6 text-left sm:p-10 ${
          featured ? "min-h-[440px] md:min-h-[480px]" : "min-h-[420px]"
        }`}
        aria-label={`Open details for ${project.title}`}
      >
        {/* accent glow tracking the pointer */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: glow,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: project.accent }}
        />

        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: project.accent }}>
              {project.kicker}
            </p>
            <p className="mt-1 font-mono text-[11px] text-fog">{project.period}</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-paper group-hover:text-ink">
            ↗
          </span>
        </div>

        <div className="relative mt-auto" style={{ transform: "translateZ(60px)" }}>
          <h3 className={`font-semibold tracking-[-0.04em] ${featured ? "text-5xl sm:text-7xl lg:text-8xl" : "text-4xl sm:text-5xl"}`}>
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-fog">{project.summary}</p>

          <div className="mt-8 max-w-md">
            <Pipeline steps={project.architecture} accent={project.accent} compact={!featured} />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.slice(0, featured ? 8 : 4).map((s) => (
              <span key={s} className="rounded-full border border-line bg-ink/50 px-3 py-1 font-mono text-[11px] text-fog">
                {s}
              </span>
            ))}
            {!featured && project.stack.length > 4 && (
              <span className="px-2 py-1 font-mono text-[11px] text-fog">+{project.stack.length - 4}</span>
            )}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const lenis = useLenis();
  useEffect(() => {
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, onClose]);

  return (
    <motion.div className="fixed inset-0 z-[75] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`card-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[28px] border border-line bg-ink-2 sm:rounded-[28px]"
        data-lenis-prevent
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: project.accent }}
        />
        <motion.div
          className="relative p-6 sm:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: project.accent }}>
                {project.kicker} · {project.period}
              </p>
              <h3 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">{project.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line transition-colors hover:bg-paper hover:text-ink"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-paper/85">{project.description}</p>

          <div className="mt-10 rounded-2xl border border-line bg-ink/60 p-6">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-fog">Flow</p>
            <Pipeline steps={project.architecture} accent={project.accent} />
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_220px]">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-fog">Highlights</p>
              <ul className="space-y-4">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    className="flex gap-4 leading-relaxed"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                  >
                    <span className="font-mono text-xs" style={{ color: project.accent }}>
                      0{i + 1}
                    </span>
                    <span className="text-paper/85">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-fog">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fog">
                    {s}
                  </span>
                ))}
              </div>
              {project.links?.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="mt-6 block text-sm underline underline-offset-4">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    const handler = (e: Event) => setOpenId((e as CustomEvent<string>).detail);
    window.addEventListener("open-project", handler);
    return () => window.removeEventListener("open-project", handler);
  }, []);

  return (
    <section id="projects" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          label="Selected work"
          title={
            <>
              Things I&apos;ve built, <span className="text-fog">from agents to platforms.</span>
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} featured={i === 0} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
