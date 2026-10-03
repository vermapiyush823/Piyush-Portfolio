"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import { scrollToId, useLenis } from "./SmoothScroll";
import { Reveal } from "./ui";

/** Button that leans toward the pointer when it's nearby. */
function Magnetic({ children, className = "", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }));
    fmt();
    const t = setInterval(fmt, 30_000);
    return () => clearInterval(t);
  }, []);
  return <span suppressHydrationWarning>{time} IST</span>;
}

export default function Contact() {
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_bottom,rgba(124,255,178,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
          <span className="text-mint">07</span>
          <span className="h-px w-10 bg-line" />
          Contact
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            Let&apos;s build
            <br />
            <span className="text-gradient">something useful.</span>
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.2} className="max-w-md text-lg text-fog">
            Whether it&apos;s an AI agent, a developer platform, or an idea you want a second pair of hands on — my inbox is open.
          </Reveal>

          <Reveal delay={0.3} className="flex flex-wrap items-center gap-4">
            <Magnetic
              onClick={copy}
              data-cursor={copied ? "Copied" : "Copy"}
              className="relative grid h-36 w-36 place-items-center rounded-full bg-mint text-sm font-medium text-ink sm:h-44 sm:w-44"
            >
              <span>{copied ? "Copied ✓" : "Copy email"}</span>
            </Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-paper/40"
            >
              {profile.email}
            </a>
          </Reveal>
        </div>

        <footer className="mt-28 border-t border-line py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-6 text-sm">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-fog hover:text-paper">
                    {s.label}
                    <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.resumeHref} target="_blank" className="text-fog hover:text-paper">
                  Résumé ↓
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-6 font-mono text-[11px] text-fog">
              <LocalTime />
              <span>© {new Date().getFullYear()} {profile.name}</span>
              <button onClick={() => scrollToId(lenis, "top")} className="hover:text-mint" aria-label="Back to top">
                ↑ Top
              </button>
            </div>
          </div>
        </footer>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[18%] text-center text-[22vw] font-semibold leading-none tracking-[-0.06em] text-paper/[0.03]">
          {profile.lastName.toUpperCase()}
        </p>
      </div>
    </section>
  );
}
