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
    <Card className="neu-card flex flex-col overflow-hidden rounded-2xl">
      <div
        className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ borderBottom: "1px solid var(--neu-shadow-a)" }}
      >
        <div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-200">Komposisi Status</div>
          <div className="text-xs font-medium text-slate-500 hidden md:block">Distribusi pipeline operasional</div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-8 pl-3 pr-8 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-inset)", border: "none" }}
          >
            <option value="all">Semua Thn</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="h-8 pl-3 pr-8 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-inset)", border: "none" }}
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
