"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { certifications } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

type Cert = (typeof certifications)[number];

/** Holographic badge: tilts toward the pointer while a foil sheen slides across. */
function Badge({ cert, index }: { cert: Cert; index: number }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 180, damping: 18 });
  const px = useTransform(mx, (v) => `${v * 100}%`);
  const py = useTransform(my, (v) => `${v * 100}%`);
  const foil = useMotionTemplate`radial-gradient(circle at ${px} ${py}, rgba(255,255,255,0.35), transparent 40%), linear-gradient(115deg, transparent 20%, rgba(124,255,178,0.25) 35%, rgba(124,200,255,0.25) 45%, rgba(182,156,255,0.25) 55%, rgba(255,200,118,0.2) 65%, transparent 80%)`;
  const foilPos = useTransform(mx, (v) => `${v * 100}% 50%`);

  return (
    <Reveal delay={index * 0.12}>
      <div style={{ perspective: 1000 }}>
        <motion.div
          data-cursor="Verified"
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
          className="group relative min-h-[320px] overflow-hidden sm:aspect-[1.6/1] sm:min-h-0 rounded-[24px] border border-line bg-gradient-to-br from-ink-3 to-ink-2 p-6 sm:p-8"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: foil, backgroundSize: "200% 100%", backgroundPosition: foilPos }}
          />
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

          <div className="relative flex h-full flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#62d84e]/15 font-mono text-xs font-bold text-[#62d84e]">
                  now
                </span>
                <div>
                  <p className="text-sm font-medium">{cert.issuer}</p>
                  <p className="font-mono text-[11px] text-fog">Issued {cert.date}</p>
                </div>
              </div>
              <span className="rounded-full border border-mint/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-mint">
                ✓ Certified
              </span>
            </div>

            <div>
              <p className="mt-8 text-6xl font-semibold tracking-tighter text-paper/90 sm:mt-0 sm:text-8xl">{cert.short}</p>
              <p className="mt-1 text-lg font-medium">{cert.title}</p>
              <p className="mt-2 max-w-sm text-sm text-fog">{cert.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Certifications"
          title={
            <>
              Platform-certified, <span className="text-fog">twice over.</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Badge key={c.id} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
