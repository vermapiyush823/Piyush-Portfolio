"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/** Card with a radial glow that follows the pointer. */
export default function Spotlight({
  children,
  className = "",
  color = "124,255,178",
  ...rest
}: { children: React.ReactNode; className?: string; color?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(${color},0.10), transparent 60%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(${color},0.55), transparent 70%)`;

  return (
    <div
      {...rest}
      className={`group relative ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
    >
      {/* gradient border via mask */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: border,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: bg }} />
      {children}
    </div>
  );
}
