"use client";

import { useEffect, useId, useRef, useState } from "react";
import { KeyCut } from "@/components/brand/KeyCut";

type Option = { title: string; slug: string };

type Props = {
  name: string;
  options: Option[];
  value: string;
  onChange: (title: string) => void;
  placeholder?: string;
};

/** Accessible dropdown that shows each service's key cut next to its name. */
export function ServiceSelect({ name, options, value, onChange, placeholder = "Choose a service" }: Props) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selected = options.find((o) => o.title === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const choose = (o: Option) => {
    onChange(o.title);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setActive(Math.max(0, options.findIndex((o) => o.title === value)));
      return setOpen(true);
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(options[active]);
    }
  };

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      {/* Real field for form submission and browser validation */}
      <input
        required
        name={name}
        value={value}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0"
      />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label="Service"
        onClick={() => {
          setActive(Math.max(0, options.findIndex((o) => o.title === value)));
          setOpen((o) => !o);
        }}
        className="t-lead flex w-full items-center gap-3 border-b border-light-ink/40 py-3 text-left text-light-ink focus:border-b-2 focus:border-accent-on-light focus:outline-none"
      >
        {selected ? (
          <>
            <KeyCut name={selected.slug} size={64} className="shrink-0 text-accent-on-light" />
            <span className="min-w-0 flex-1 truncate">{selected.title}</span>
          </>
        ) : (
          <span className="flex-1 text-light-faint">{placeholder}</span>
        )}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M3 5l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label="Services"
          className="absolute inset-x-0 top-full z-30 mt-1 max-h-72 overflow-y-auto rounded-2xl border border-accent/30 bg-base p-2 shadow-2xl"
        >
          {options.map((o, i) => (
            <li
              key={o.slug}
              role="option"
              aria-selected={o.title === value}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(o)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl t-body px-3 py-2.5 text-ink ${
                i === active ? "bg-accent/15" : ""
              }`}
            >
              <KeyCut name={o.slug} size={56} className="shrink-0 text-accent" />
              <span className="min-w-0 flex-1">{o.title}</span>
              {o.title === value && <span className="t-label text-accent-light">Selected</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
