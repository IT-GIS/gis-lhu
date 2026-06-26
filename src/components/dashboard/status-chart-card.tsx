"use client";

import { useMemo, useState } from "react";

import {
  SampleCategoryPieChart,
  type SampleCategoryData,
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

export type SampleCategoryChartRow = {
  year: string;
  month: string;
  monthIndex: number;
  sampleName: string;
  sampleCategory: string;
};

export function StatusChartCard({
  allData = [],
}: {
  allData?: SampleCategoryChartRow[];
}) {
  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(allData.map((item) => item.year)));
    return years.sort((a, b) => Number(b) - Number(a));
  }, [allData]);

  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

  const data = useMemo<SampleCategoryData[]>(() => {
    const filteredRows = allData.filter((item) => {
      const yearMatch = year === "all" || item.year === year;
      const monthMatch = month === "all" || item.month === month;

      return yearMatch && monthMatch;
    });

    const categoryMap = new Map<string, number>();

    filteredRows.forEach((item) => {
      const category = item.sampleCategory?.trim() || "Lainnya";
      categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
    });

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [allData, month, year]);

  return (
    <Card className="flex flex-col overflow-hidden rounded-[28px] p-0">
      <div className="flex flex-col justify-between gap-3 border-b border-sky-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center md:px-6">
        <div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-200">
            Jenis Sampel GIS LHU
          </div>
          <div className="hidden text-xs font-medium text-slate-500 md:block">
            Distribusi kategori berdasarkan Sample Name
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="h-8 cursor-pointer rounded-xl border border-sky-100 bg-white/80 py-1 pl-3 pr-8 text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">Semua Thn</option>
            {yearOptions.map((optionYear) => (
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
        <SampleCategoryPieChart
          data={data.length > 0 ? data : [{ name: "Belum ada data", value: 1 }]}
        />
      </div>
    </Card>
  );
}
