"use client";

import { education, stats } from "@/data/content";
import { Counter, Marquee, Reveal, ScrollText, SectionHeading } from "./ui";

const STATEMENT =
  "I build the tools and AI agents that make 2,500 engineers faster. Intern to engineer, all at ServiceNow.";

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" label="About" title={<>Engineering leverage, <span className="text-fog">not just features.</span></>} />

        <ScrollText text={STATEMENT} className="max-w-5xl text-2xl font-medium leading-snug tracking-tight sm:text-4xl lg:text-[2.75rem]" />

        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="group relative bg-ink p-6 transition-colors hover:bg-ink-2 sm:p-8">
              <div className="text-5xl font-semibold tracking-tight sm:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-fog">{s.label}</p>
              <span className="absolute right-5 top-5 font-mono text-[10px] text-fog/50 transition-colors group-hover:text-mint">
                0{i + 1}
              </span>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.1} className="flex items-center justify-between gap-6 rounded-3xl border border-line p-6 sm:p-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-fog">{e.period}</p>
                <h3 className="mt-2 text-lg font-medium">{e.school}</h3>
                <p className="text-sm text-fog">{e.degree}</p>
              </div>
              <span className="shrink-0 rounded-full border border-mint/30 bg-mint/5 px-3 py-1 font-mono text-xs text-mint">{e.score}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-28 space-y-4">
        <Marquee items={["AI Agents", "LangGraph", "TypeScript", "ServiceNow SDK", "RAG", "Next.js", "MCP", "Fluent"]} />
        <Marquee reverse items={["Developer Experience", "Platform Engineering", "Best Practices", "Automation", "Full-stack"]} />
      </div>
    </section>
  );
}
