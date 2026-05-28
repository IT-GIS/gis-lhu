import Link from "next/link";
import { Search } from "lucide-react";

import { FlashMessage } from "@/components/flash-message";
import { FormTypeBadge } from "@/components/form-type-badge";
import { DeleteDocumentForm } from "@/components/lhu/delete-document-form";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getDocuments } from "@/lib/documents";
import { resolveLhuPayload } from "@/lib/lhu-payload";
import { canCreateDocument, canDeleteDocument } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function normalizeSearchText(value: string | null | undefined) {
  return (value ?? "").toLowerCase().trim();
}

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await requireAuthenticatedUser();
  const query = await searchParams;
  const documents = await getDocuments();
  const canDelete = canDeleteDocument(user.role);
  const error = typeof query.error === "string" ? query.error : undefined;
  const success = typeof query.success === "string" ? query.success : undefined;
  const searchQuery = typeof query.q === "string" ? query.q.trim() : "";
  const searchNeedle = normalizeSearchText(searchQuery);
  const documentRows = documents.map((document) => {
    const payload = resolveLhuPayload(document.formType, document.formPayload);
    const principalName = payload.principal.name || document.clientName || document.title;
    const reportNo = payload.reportNo || document.referenceNo || "-";
    const sampleName = payload.sample.sampleName || document.sampleName || "-";
    const searchableText = [
      principalName,
      document.title,
      document.documentNumber,
      reportNo,
      document.referenceNo,
      sampleName,
      document.sampleName,
    ]
      .map(normalizeSearchText)
      .join(" ");

    return {
      document,
      principalName,
      reportNo,
      sampleName,
      matchesSearch: !searchNeedle || searchableText.includes(searchNeedle),
    };
  });
  const filteredRows = documentRows.filter((row) => row.matchesSearch);

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Dokumen LHU"
        description="Daftar LHU yang dibuat dari menu Buat Draft, lengkap dengan barcode verifikasi aktif."
        actions={
          canCreateDocument(user.role) ? (
            <Button asChild>
              <Link href="/documents/new">Buat Draft Baru</Link>
            </Button>
          ) : undefined
        }
      />

      <FlashMessage error={error} success={success} />

      <SectionCard
        title="Daftar LHU"
        description={
          searchQuery
            ? `${filteredRows.length} dari ${documents.length} LHU cocok dengan pencarian`
            : `${documents.length} LHU tersimpan di database`
        }
      >
        <div className="space-y-4">
          <form action="/documents" className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-950/50 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                name="q"
                defaultValue={searchQuery}
                className="pl-10"
                placeholder="Cari nama pelanggan, no dokumen, no laporan, atau sampel"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 sm:flex-none">
                Cari
              </Button>
              {searchQuery ? (
                <Button asChild variant="outline" className="flex-1 sm:flex-none">
                  <Link href="/documents">Reset</Link>
                </Button>
              ) : null}
            </div>
          </form>

          {filteredRows.length ? (
            filteredRows.map(({ document, principalName, reportNo, sampleName }) => {
              return (
                <article
                  key={document.id}
                  className="rounded-[28px] border border-sky-100 bg-sky-50/55 px-5 py-5 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-bold text-[var(--color-gis-navy)] dark:text-slate-100">
                          {principalName}
                        </h2>
                        <StatusBadge status={document.status} />
                        <FormTypeBadge formType={document.formType} />
                      </div>

                    <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4 dark:text-slate-300">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">No. dokumen</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{document.documentNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">No. laporan</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{reportNo}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Klien</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{principalName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Sampel</p>
                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{sampleName}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-slate-500">
                      <span>Creator: {document.creator.name}</span>
                      <span>Assignee: {document.assignedTo?.name ?? "-"}</span>
                      <span>Updated: {formatDate(document.updatedAt)}</span>
                      <span>{document.verification?.isActive ? "Barcode aktif" : "Barcode tidak aktif"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/documents/${document.id}`}>Buka</Link>
                    </Button>
                    {document.verification ? (
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/documents/${document.id}/barcode`}>Barcode</Link>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Barcode
                      </Button>
                    )}
                    {canDelete ? (
                      <DeleteDocumentForm documentId={document.id} documentLabel={principalName} />
                    ) : null}
                  </div>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="rounded-[24px] border border-dashed border-sky-200 bg-sky-50/60 px-5 py-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
              {searchQuery
                ? "Tidak ada LHU yang cocok dengan pencarian tersebut."
                : "Belum ada LHU. Buat draft baru untuk mulai mengisi dokumen."}
            </p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
