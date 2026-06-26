import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  PencilLine,
  Send,
  ShieldCheck,
} from "lucide-react";

import { DocumentsChartCard } from "@/components/dashboard/documents-chart-card";
import { StatusChartCard } from "@/components/dashboard/status-chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/documents";
import { canCreateDocument } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await requireAuthenticatedUser();
  const data = await getDashboardData();

  const statusCounts: Record<string, number> = {};
  data.documentsByStatus.forEach((item) => {
    statusCounts[item.status] = item._count.status;
  });

  const totalDocuments = data.documentsByStatus.reduce((sum, item) => sum + item._count.status, 0);
  const kpiCards = [
    { label: "Total", value: totalDocuments, icon: FileText, tone: "from-[var(--color-gis-blue)] to-cyan-400" },
    { label: "Draft", value: statusCounts["draft"] ?? 0, icon: PencilLine, tone: "from-slate-500 to-slate-400" },
    { label: "Input Hasil", value: statusCounts["input_hasil"] ?? 0, icon: Send, tone: "from-sky-500 to-cyan-400" },
    { label: "Revisi", value: statusCounts["revisi"] ?? 0, icon: ArrowRight, tone: "from-amber-500 to-orange-400" },
    { label: "Approved", value: statusCounts["approved"] ?? 0, icon: ShieldCheck, tone: "from-teal-500 to-emerald-400" },
    { label: "Published", value: statusCounts["published"] ?? 0, icon: CheckCircle2, tone: "from-emerald-500 to-cyan-400" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Ringkasan operasional LHU, aktivitas terbaru, dan jalur cepat ke workflow utama."
        actions={
          canCreateDocument(user.role) ? (
            <Button asChild>
              <Link href="/documents/new">Buat Dokumen Baru</Link>
            </Button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Card
              key={kpi.label}
              className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${kpi.tone} opacity-15 transition group-hover:scale-110 group-hover:opacity-25`}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[var(--color-muted-foreground)]">
                    {kpi.label}
                  </div>
                  <div className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--color-gis-navy)] dark:text-white">
                    {kpi.value}
                  </div>
                </div>
                <div
                  className={`rounded-2xl bg-gradient-to-br ${kpi.tone} p-2.5 text-white shadow-glow`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DocumentsChartCard allData={data.monthlyDocuments} />
        <StatusChartCard allData={data.sampleCategoryDocuments} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[28px]">
          <div className="text-lg font-bold text-[var(--color-gis-navy)] dark:text-slate-100">
            Aktivitas Terbaru
          </div>
          <div className="mt-5 space-y-3">
            {data.latestActivities.length === 0 ? (
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Belum ada aktivitas tercatat.
              </p>
            ) : (
              data.latestActivities.map((log) => (
                <div
                  key={log.id}
                  className="group relative rounded-2xl border border-sky-100 bg-sky-50/55 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl bg-[var(--color-gis-blue)] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {log.action}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {log.actor?.name ?? "System"}
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-gis-blue)]">
                    {log.createdAt.toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="rounded-[28px]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-[var(--color-gis-navy)] dark:text-slate-100">
                Dokumen Terbaru
              </div>
              <div className="text-sm text-[var(--color-muted-foreground)]">
                Snapshot dokumen penting
              </div>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/documents">
                Buka semua
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {data.latestDocuments.length === 0 ? (
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Belum ada dokumen LHU.
              </p>
            ) : (
              data.latestDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="group overflow-hidden rounded-2xl border border-sky-100 bg-sky-50/55 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-bold text-slate-900 transition-colors group-hover:text-[var(--color-gis-blue)] dark:text-slate-100 dark:group-hover:text-[var(--color-gis-cyan)]">
                        {doc.title}
                      </div>
                      <div className="mt-1.5 truncate text-sm font-medium text-slate-600 dark:text-slate-400">
                        {doc.documentNumber}
                        <span className="mx-1 text-slate-300">/</span>
                        {doc.creator?.name ?? "-"}
                      </div>
                      <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {formatDate(doc.updatedAt)}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={doc.status} />
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end border-t border-sky-100 pt-4 dark:border-slate-800/80">
                    <Button
                      variant="ghost"
                      asChild
                      className="h-8 rounded-full bg-sky-50 px-4 text-xs font-bold text-[var(--color-gis-blue)] transition-colors hover:bg-[var(--color-gis-blue)] hover:text-white dark:bg-slate-800 dark:text-[var(--color-gis-cyan)]"
                    >
                      <Link href={`/documents/${doc.id}`}>
                        Lihat Detail
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
