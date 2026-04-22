"use client";

import type { ReactNode } from "react";

export function AdminCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-zinc-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-zinc-500">{description}</p>
      )}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-zinc-800">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-zinc-500">{hint}</p>}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
    />
  );
}

export function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="min-w-[140px] text-sm font-semibold text-zinc-800">
        {label}
      </span>
      <input
        type="color"
        value={value.length === 7 ? value : "#f97316"}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-14 cursor-pointer rounded-lg border border-zinc-200 bg-white p-0.5"
        aria-label={label}
      />
      <TextInput value={value} onChange={onChange} placeholder="#hex" />
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-left text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
    >
      <span>{label}</span>
      <span
        className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-accent" : "bg-zinc-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <input
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full max-w-[120px] rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
    />
  );
}

export function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: readonly { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto pb-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
            active === t.id
              ? "bg-zinc-900 text-white shadow-md"
              : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function BtnSecondary({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:opacity-50 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function BtnDanger({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function BtnPrimary({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-accent-hover disabled:opacity-50"
    >
      {children}
    </button>
  );
}
