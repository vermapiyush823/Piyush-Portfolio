"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { skillGroups } from "@/data/content";
import { Reveal, SectionHeading, ease } from "./ui";

// Which groups sit on which orbit (inner → outer), and how fast each ring turns.
const RINGS: { groups: string[]; radius: number; duration: number; reverse?: boolean }[] = [
  { groups: ["lang"], radius: 0.15, duration: 40 },
  { groups: ["core", "backend"], radius: 0.26, duration: 60, reverse: true },
  { groups: ["ai"], radius: 0.37, duration: 80 },
  { groups: ["frontend", "data", "servicenow"], radius: 0.485, duration: 110, reverse: true },
];

const GROUP_COLOR: Record<string, string> = {
  ai: "#7cffb2",
  lang: "#ffc876",
  frontend: "#7cc8ff",
  backend: "#b69cff",
  data: "#ff9fc6",
  servicenow: "#62d84e",
  core: "#eef0f5",
};

function Orbit({ active, paused }: { active: string | null; paused: boolean }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[720px] ${paused ? "orbit-paused" : ""}`}>
      {/* core */}
      <div className="absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-mint/40 bg-ink-2 shadow-[0_0_80px_-10px_rgba(124,255,178,0.5)]">
        <span className="font-mono text-xs text-mint">{"</PV>"}</span>
      </div>

      {RINGS.map((ring, ri) => {
        const skills = ring.groups.flatMap((g) => skillGroups.find((s) => s.id === g)!.skills.map((name) => ({ name, group: g })));
        const anim = `orbit ${ring.duration}s linear infinite${ring.reverse ? " reverse" : ""}`;
        const counter = `orbit ${ring.duration}s linear infinite${ring.reverse ? "" : " reverse"}`;
        return (
          <motion.div
            key={ri}
            className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-line"
            style={{
              width: `${ring.radius * 200}%`,
              height: `${ring.radius * 200}%`,
              marginLeft: `${-ring.radius * 100}%`,
              marginTop: `${-ring.radius * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: ri * 0.12, ease }}
          >
            <div className="absolute inset-0" style={{ animation: anim }}>
              {skills.map((s, i) => {
                const angle = (i / skills.length) * Math.PI * 2;
                const x = 50 + Math.cos(angle) * 50;
                const y = 50 + Math.sin(angle) * 50;
                const on = !active || active === s.group;
                return (
                  <div key={s.name} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                    <div style={{ animation: counter }}>
                      <span
                        className="block whitespace-nowrap rounded-full border bg-ink px-2.5 py-1 font-mono text-[11px] transition-all duration-500"
                        style={{
                          borderColor: on ? `${GROUP_COLOR[s.group]}66` : "rgb(255 255 255 / 0.06)",
                          color: on ? GROUP_COLOR[s.group] : "rgb(139 144 160 / 0.35)",
                          boxShadow: active === s.group ? `0 0 24px -4px ${GROUP_COLOR[s.group]}88` : "none",
                          transform: `translate(-50%, -50%) scale(${active === s.group ? 1.12 : 1})`,
                        }}
                      >
                        {s.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Compact orbit for small screens: categories orbit instead of every skill.
const MOBILE_RINGS: { groups: string[]; radius: number; duration: number; reverse?: boolean }[] = [
  { groups: ["lang", "core", "backend"], radius: 0.25, duration: 50 },
  { groups: ["ai", "frontend", "data", "servicenow"], radius: 0.43, duration: 70, reverse: true },
];

function MobileOrbit({ active, onSelect }: { active: string | null; onSelect: (id: string | null) => void }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[380px] ${active ? "orbit-paused" : ""}`}>
      <button
        onClick={() => onSelect(null)}
        aria-label="Show all skills"
        className="absolute left-1/2 top-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-mint/40 bg-ink-2 shadow-[0_0_60px_-10px_rgba(124,255,178,0.5)]"
      >
        <span className="font-mono text-[10px] text-mint">{"</PV>"}</span>
      </button>

      {MOBILE_RINGS.map((ring, ri) => {
        const anim = `orbit ${ring.duration}s linear infinite${ring.reverse ? " reverse" : ""}`;
        const counter = `orbit ${ring.duration}s linear infinite${ring.reverse ? "" : " reverse"}`;
        return (
          <motion.div
            key={ri}
            className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-line"
            style={{
              width: `${ring.radius * 200}%`,
              height: `${ring.radius * 200}%`,
              marginLeft: `${-ring.radius * 100}%`,
              marginTop: `${-ring.radius * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: ri * 0.12, ease }}
          >
            <div className="absolute inset-0" style={{ animation: anim }}>
              {ring.groups.map((id, i) => {
                const g = skillGroups.find((s) => s.id === id)!;
                const angle = (i / ring.groups.length) * Math.PI * 2 - Math.PI / 2;
                const on = !active || active === id;
                return (
                  <div key={id} className="absolute" style={{ left: `${50 + Math.cos(angle) * 50}%`, top: `${50 + Math.sin(angle) * 50}%` }}>
                    <div style={{ animation: counter }}>
                      <button
                        onClick={() => onSelect(active === id ? null : id)}
                        aria-pressed={active === id}
                        className="block whitespace-nowrap rounded-full border bg-ink px-3 py-1.5 font-mono text-[11px] transition-all duration-500"
                        style={{
                          borderColor: on ? `${GROUP_COLOR[id]}66` : "rgb(255 255 255 / 0.06)",
                          color: on ? GROUP_COLOR[id] : "rgb(139 144 160 / 0.35)",
                          boxShadow: active === id ? `0 0 24px -4px ${GROUP_COLOR[id]}88` : "none",
                          transform: `translate(-50%, -50%) scale(${active === id ? 1.12 : 1})`,
                        }}
                      >
                        {g.label}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const current = skillGroups.find((g) => g.id === active);

  return (
    <section id="skills" className="relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="Stack"
          title={
            <>
              A toolkit orbiting <span className="text-gradient">AI &amp; platforms.</span>
            </>
          }
        />

        <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr]">
          <div>
            <Reveal>
              <p className="mb-6 text-fog">
                <span className="lg:hidden">Tap a category to see its skills.</span>
                <span className="hidden lg:inline">Hover a category to light up its orbit.</span> Inner rings are fundamentals; the outer rings are where I build products.
              </p>
            </Reveal>
            <Reveal className="lg:hidden">
              <MobileOrbit active={active} onSelect={setActive} />
            </Reveal>
            <ul className="hidden lg:flex lg:flex-col lg:gap-1">
              {skillGroups.map((g, i) => (
                <Reveal key={g.id} delay={i * 0.05} y={10}>
                  <button
                    onMouseEnter={() => setActive(g.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(g.id)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive((a) => (a === g.id ? null : g.id))}
                    className={`flex w-full items-center justify-between gap-6 rounded-xl border px-4 py-3 text-left text-sm transition-all lg:rounded-2xl ${
                      active === g.id ? "border-line bg-ink-2" : "border-transparent hover:bg-ink-2/50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full" style={{ background: GROUP_COLOR[g.id] }} />
                      {g.label}
                    </span>
                    <span className="font-mono text-[11px] text-fog">{String(g.skills.length).padStart(2, "0")}</span>
                  </button>
                </Reveal>
              ))}
            </ul>

            {/* Chip view for small screens, also used as the "detail" panel on desktop */}
            <div className="mt-8 min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current?.id ?? "all"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-wrap gap-2 lg:hidden"
                >
                  {(current ? [current] : skillGroups).flatMap((g) =>
                    g.skills.map((s) => (
                      <span
                        key={g.id + s}
                        className="rounded-full border px-3 py-1 font-mono text-[11px]"
                        style={{ borderColor: `${GROUP_COLOR[g.id]}55`, color: GROUP_COLOR[g.id] }}
                      >
                        {s}
                      </span>
                    )),
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="hidden lg:block"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <Orbit active={active} paused={hovering || !!active} />
          </div>
        </div>
      </div>
    </section>
  );
}
