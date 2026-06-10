export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-[30px] border border-white/70 bg-white/72 p-7 shadow-glass backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/50 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]">
          GIS LHU
        </p>
        <h1 className="bg-gradient-to-r from-[var(--color-gis-navy)] via-[var(--color-gis-blue)] to-cyan-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-sm dark:from-white dark:via-cyan-100 dark:to-[var(--color-gis-cyan)] md:text-4xl">
          {title}
        </h1>
        {description ? <p className="mt-3 max-w-3xl text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
