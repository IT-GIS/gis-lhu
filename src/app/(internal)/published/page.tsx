import Link from "next/link";

import { FormTypeBadge } from "@/components/form-type-badge";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getPublishedDocuments } from "@/lib/documents";
import { formatDate } from "@/lib/utils";

export default async function PublishedPage() {
  const documents = await getPublishedDocuments();

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Dokumen published dan revoked"
        description="Pantau token verifikasi yang sedang aktif dan histori dokumen yang telah direvoke."
      />

      <SectionCard title="Daftar publikasi" description={`${documents.length} dokumen`}>
        <div className="space-y-4">
          {documents.map((document) => (
            <Link
              key={document.id}
              href={`/documents/${document.id}`}
              className="block rounded-[28px] border border-sky-100 bg-sky-50/55 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-[var(--color-gis-navy)] dark:text-slate-100">{document.title}</h2>
                    <StatusBadge status={document.status} />
                    <FormTypeBadge formType={document.formType} />
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                    <span>{document.documentNumber}</span>
                    <span>Published: {formatDate(document.publishedAt)}</span>
                    <span>Token: {document.verification?.token ?? "-"}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  {document.verification?.isActive ? "Aktif" : "Tidak aktif"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
