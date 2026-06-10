import { Activity } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { requireAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AuditLogsPage() {
  await requireAuthenticatedUser();

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      actor: {
        select: { name: true, role: true },
      },
    },
  });

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Audit Logs"
        description="Pantau seluruh jejak aktivitas pengguna, pembuatan dokumen, dan autentikasi di dalam sistem GIS LHU."
      />

      <SectionCard
        title="Histori Aktivitas Sistem"
        description={`Menampilkan ${logs.length} aktivitas terbaru.`}
      >
        <div className="mt-4">
          {logs.length === 0 ? (
            <p className="rounded-[24px] border border-dashed border-sky-200 bg-sky-50/60 px-5 py-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
              Belum ada aktivitas tercatat.
            </p>
          ) : (
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Pengguna / Aktor</TableHead>
                    <TableHead>Aktivitas</TableHead>
                    <TableHead>Target Entitas</TableHead>
                    <TableHead>Detail Metadata</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                        {log.createdAt.toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        WIB
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100">
                        {log.actor?.name ?? "System"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-medium">
                          <Activity className="h-3.5 w-3.5 text-[var(--color-gis-blue)] dark:text-[var(--color-gis-cyan)]" />
                          {log.action}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-[11px] text-slate-500">
                        {log.entityType}
                      </TableCell>
                      <TableCell>
                        {log.metadata &&
                        Object.keys(log.metadata).length > 0 ? (
                          <span className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[10px] text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                            {JSON.stringify(log.metadata)}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
