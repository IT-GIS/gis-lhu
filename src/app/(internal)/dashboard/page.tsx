import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { requireAuthenticatedUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/documents";
import { statusLabels } from "@/lib/domain";
import { canCreateDocument } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

import { DocumentsChartCard } from "@/components/dashboard/documents-chart-card";
import { StatusChartCard } from "@/components/dashboard/status-chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

export default async function DashboardPage() {
  const user = await requireAuthenticatedUser();
  const data = await getDashboardData();

  // Build KPI data from status counts
  const statusCounts: Record<string, number> = {};
  data.documentsByStatus.forEach((item) => {
    statusCounts[item.status] = item._count.status;
  });
  const totalDocuments = data.documentsByStatus.reduce((sum, item) => sum + item._count.status, 0);

  const kpiCards = [
    { label: "Total", value: totalDocuments, color: "text-gis-blue" },
    { label: "Draft", value: statusCounts["draft"] ?? 0, color: "text-slate-600" },
    { label: "Input Hasil", value: statusCounts["input_hasil"] ?? 0, color: "text-blue-600" },
    { label: "Review QA", value: statusCounts["review"] ?? 0, color: "text-amber-600" },
    { label: "Revisi", value: statusCounts["revisi"] ?? 0, color: "text-orange-600" },
    { label: "Approved", value: statusCounts["approved"] ?? 0, color: "text-purple-600" },
    { label: "Published", value: statusCounts["published"] ?? 0, color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Ringkasan operasional LHU, aktivitas terbaru, dan jalur cepat ke workflow utama."
        actions={
          canCreateDocument(user.role) ? (
            <Button asChild className="bg-indigo-600 shadow-sm hover:bg-indigo-700">
              <Link href="/documents/new">Buat Dokumen Baru</Link>
            </Button>
          ) : undefined
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-4">
        {kpiCards.map((kpi) => (
          <Card
            key={kpi.label}
            className="bg-white/85 dark:bg-slate-900/80 p-5 flex flex-col gap-2 shadow-sm border-slate-200 dark:border-slate-800"
          >
            <div className="text-sm font-medium text-[var(--color-muted-foreground)]">{kpi.label}</div>
            <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DocumentsChartCard />
        <StatusChartCard counts={statusCounts} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {/* Recent Activity */}
        <Card className="neu-card rounded-2xl">
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">Aktivitas Terbaru</div>
          <div className="mt-5 space-y-3">
            {data.latestActivities.length === 0 ? (
              <p className="text-sm text-[var(--color-muted-foreground)]">Belum ada aktivitas tercatat.</p>
            ) : (
              data.latestActivities.map((log) => (
                <div
                  key={log.id}
                  className="group relative rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-raised)" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {log.action}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{log.actor?.name ?? "System"}</div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                    {log.createdAt.toLocaleString("id-ID", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Latest Documents */}
        <Card className="neu-card rounded-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Dokumen Terbaru</div>
              <div className="text-sm text-[var(--color-muted-foreground)]">Snapshot dokumen penting</div>
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
              <p className="text-sm text-[var(--color-muted-foreground)]">Belum ada dokumen LHU.</p>
            ) : (
              data.latestDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="group overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-raised)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {doc.title}
                      </div>
                      <div className="mt-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                        {doc.documentNumber}
                        <span className="text-slate-300 mx-1">•</span>
                        {doc.creator?.name ?? "—"}
                      </div>
                      <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {formatDate(doc.updatedAt)}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={doc.status} />
                    </div>
                  </div>
                  <div className="mt-5 border-t border-slate-100 dark:border-slate-800/50 pt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      asChild
                      className="h-8 px-4 text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors rounded-full"
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
