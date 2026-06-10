import { Card } from "@/components/ui/card";

/** Props-driven KPI Grid — data sent from parent server component */
interface KpiItem {
  label: string;
  value: number | string;
  delta?: string;
  color?: string;
}

interface Props {
  items: KpiItem[];
}

export function KpiGrid({ items }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <Card
          key={item.label}
          className="group relative cursor-default overflow-hidden rounded-[28px] border border-white/70 bg-white/82 p-6 shadow-glass backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Decorative gradient orb */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-200/60 to-sky-100/40 opacity-70 transition-transform duration-700 ease-out group-hover:scale-[2] dark:from-sky-900/30 dark:to-transparent" />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-[var(--color-gis-blue)] dark:text-slate-400 dark:group-hover:text-[var(--color-gis-cyan)]">
              {item.label}
            </div>
            <div className={`mt-3 text-4xl font-extrabold tracking-tight ${item.color ?? "text-slate-800 dark:text-slate-100"}`}>
              {item.value}
            </div>
            {item.delta && (
              <div className="mt-3 inline-flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
                {item.delta}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
