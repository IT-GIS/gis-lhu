"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = [
  "#289db9",
  "#5ac8e0",
  "#b3e5f0",
  "#34d399",
  "#60a5fa",
  "#f87171",
  "#fbbf24",
  "#a78bfa",
  "#fb7185",
];

export interface DocumentData {
  month: string;
  published: number;
}

export interface SampleCategoryData {
  name: string;
  value: number;
}

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

const emptyMonthlyData: DocumentData[] = MONTHS.map((month) => ({
  month,
  published: 0,
}));

const emptySampleCategoryData: SampleCategoryData[] = [
  { name: "Belum ada data", value: 1 },
];

export function DocumentsBarChart({
  data = emptyMonthlyData,
}: {
  data?: DocumentData[];
}) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="published"
            name="Published"
            radius={[8, 8, 0, 0]}
            fill={colors[0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SampleCategoryPieChart({
  data = emptySampleCategoryData,
}: {
  data?: SampleCategoryData[];
}) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={72}
            outerRadius={110}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
