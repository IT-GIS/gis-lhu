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
          className="neu-card group relative overflow-hidden rounded-2xl p-6 cursor-default hover:-translate-y-1.5 transition-all duration-500"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Decorative gradient orb */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200/50 to-indigo-100/30 dark:from-indigo-900/30 dark:to-transparent opacity-70 transition-transform duration-700 group-hover:scale-[2] ease-out pointer-events-none" />
          <div className="relative">
            <div className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
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
