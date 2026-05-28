import type { ReactNode } from "react";

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-glass backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/55">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[var(--color-gis-navy)] dark:text-slate-100">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
