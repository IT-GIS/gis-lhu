"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { StatusPieChart, type StatusData } from "@/components/dashboard/charts";

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  input_hasil: "Input Hasil",
  review: "Review",
  revisi: "Revisi",
  approved: "Approved",
  published: "Published",
  revoked: "Revoked",
};

/**
 * StatusChartCard
 * Receives counts from parent server component for display in pie chart.
 */
export function StatusChartCard({ counts }: { counts?: Record<string, number> }) {
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

  const data: StatusData[] = Object.entries(counts ?? {})
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      name: STATUS_LABELS[key] ?? key,
      value,
    }));

  return (
    <Card className="flex flex-col overflow-hidden rounded-[28px] p-0">
      <div className="flex flex-col justify-between gap-3 border-b border-sky-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center md:px-6">
        <div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-200">Komposisi Status</div>
          <div className="text-xs font-medium text-slate-500 hidden md:block">Distribusi pipeline operasional</div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-8 cursor-pointer rounded-xl border border-sky-100 bg-white/80 py-1 pl-3 pr-8 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">Semua Thn</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="h-8 cursor-pointer rounded-xl border border-sky-100 bg-white/80 py-1 pl-3 pr-8 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">Semua Bln</option>
            {["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-6">
        <StatusPieChart data={data.length > 0 ? data : [{ name: "Belum ada data", value: 1 }]} />
      </div>
    </Card>
  );
}
