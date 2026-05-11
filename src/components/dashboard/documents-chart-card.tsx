"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DocumentsBarChart, type DocumentData } from "@/components/dashboard/charts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/**
 * DocumentsChartCard
 * Receives data from parent server component.
 * Falls back to empty data if none provided.
 */
export function DocumentsChartCard({ allData }: { allData?: DocumentData[] }) {
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("all");

  const base = allData ?? MONTHS.map((m) => ({ month: m, draft: 0, review: 0, published: 0 }));
  const displayedData = month === "all" ? base : base.filter((d) => d.month === month);

  return (
    <Card className="neu-card flex flex-col overflow-hidden rounded-2xl">
      <div
        className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ borderBottom: "1px solid var(--neu-shadow-a)" }}
      >
        <div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-200">Dokumen per Bulan</div>
          <div className="text-xs font-medium text-slate-500 hidden md:block">Volume Draft, Review, dan Published</div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-8 pl-3 pr-8 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-inset)", border: "none" }}
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="h-8 pl-3 pr-8 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-inset)", border: "none" }}
          >
            <option value="all">Semua Bln</option>
            {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div className="p-6">
        <DocumentsBarChart data={displayedData} />
      </div>
    </Card>
  );
}
