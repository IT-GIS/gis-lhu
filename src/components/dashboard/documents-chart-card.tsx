"use client";

import { useMemo, useState } from "react";

import {
  DocumentsBarChart,
  type DocumentData,
} from "@/components/dashboard/charts";
import { Card } from "@/components/ui/card";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export type MonthlyDocumentChartData = {
  year: string;
  month: string;
  monthIndex: number;
  published: number;
};

export function DocumentsChartCard({
  allData = [],
}: {
  allData?: MonthlyDocumentChartData[];
}) {
  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(allData.map((item) => item.year)));
    return years.sort((a, b) => Number(b) - Number(a));
  }, [allData]);

  const [year, setYear] = useState(
    yearOptions[0] ?? String(new Date().getFullYear()),
  );
  const [month, setMonth] = useState("all");

  const displayedData = useMemo<DocumentData[]>(() => {
    const selectedYear =
      year || yearOptions[0] || String(new Date().getFullYear());

    const rows = MONTHS.map((monthLabel, monthIndex) => {
      const found = allData.find(
        (item) => item.year === selectedYear && item.monthIndex === monthIndex,
      );

      return {
        month: monthLabel,
        published: found?.published ?? 0,
      };
    });

    return month === "all" ? rows : rows.filter((item) => item.month === month);
  }, [allData, month, year, yearOptions]);

  return (
    <Card className="flex flex-col overflow-hidden rounded-[28px] p-0">
      <div className="flex flex-col justify-between gap-3 border-b border-sky-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center md:px-6">
        <div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-200">
            Dokumen per Bulan
          </div>
          <div className="hidden text-xs font-medium text-slate-500 md:block">
            Jumlah LHU yang dibuat berdasarkan tanggal dokumen
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="h-8 cursor-pointer rounded-xl border border-sky-100 bg-white/80 py-1 pl-3 pr-8 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {(yearOptions.length
              ? yearOptions
              : [String(new Date().getFullYear())]
            ).map((optionYear) => (
              <option key={optionYear} value={optionYear}>
                {optionYear}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="h-8 cursor-pointer rounded-xl border border-sky-100 bg-white/80 py-1 pl-3 pr-8 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">Semua Bln</option>
            {MONTHS.map((monthLabel) => (
              <option key={monthLabel} value={monthLabel}>
                {monthLabel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        <DocumentsBarChart data={displayedData} />
      </div>
    </Card>
  );
}
