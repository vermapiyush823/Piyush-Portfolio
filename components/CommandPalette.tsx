"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks, profile, projects } from "@/data/content";
import { useLenis } from "./SmoothScroll";

type Action = { id: string; label: string; hint: string; group: string; run: () => void };

export default function CommandPalette({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const lenis = useLenis();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(
    () => [
      ...navLinks.map((l) => ({
        id: `go-${l.id}`,
        label: `Go to ${l.label}`,
        hint: "↵",
        group: "Navigate",
        run: () => onNavigate(l.id),
      })),
      ...projects.map((p) => ({
        id: `proj-${p.id}`,
        label: `Open ${p.title}`,
        hint: p.kicker,
        group: "Projects",
        run: () => {
          onNavigate("projects");
          setTimeout(() => window.dispatchEvent(new CustomEvent("open-project", { detail: p.id })), 900);
        },
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Contact",
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setToast("Email copied");
        },
      },
      ...profile.socials.map((s) => ({
        id: `social-${s.label}`,
        label: `Open ${s.label}`,
        hint: "↗",
        group: "Contact",
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
      {
        id: "resume",
        label: "Download résumé",
        hint: "PDF",
        group: "Contact",
        run: () => window.open(profile.resumeHref, "_blank"),
      },
    ],
    [onNavigate],
  );

  const filtered = actions.filter((a) => (a.label + a.hint + a.group).toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      lenis?.stop();
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      lenis?.start();
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (a?: Action) => {
    if (!a) return;
    onClose();
    a.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(filtered.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    }
    if (e.key === "Enter") run(filtered[index]);
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/60 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              role="dialog"
              aria-label="Command palette"
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl shadow-black/60"
              initial={{ scale: 0.96, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKey}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <span className="font-mono text-mint">›</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-fog"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fog">ESC</kbd>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
                {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-fog">No results.</li>}
                {filtered.map((a, i) => {
                  const header = a.group !== lastGroup;
                  lastGroup = a.group;
                  return (
                    <li key={a.id}>
                      {header && (
                        <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-fog">{a.group}</div>
                      )}
                      <button
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => run(a)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          i === index ? "bg-ink-3 text-paper" : "text-fog"
                        }`}
                      >
                        <span>{a.label}</span>
                        <span className="truncate pl-4 font-mono text-[11px] text-fog">{a.hint}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-[85] -translate-x-1/2 rounded-full bg-mint px-4 py-2 font-mono text-xs text-ink"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
