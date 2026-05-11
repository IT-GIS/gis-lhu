import Link from "next/link";

import { FormTypeBadge } from "@/components/form-type-badge";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { getPublishedDocuments } from "@/lib/documents";
import { formatDate } from "@/lib/utils";

export default async function PublishedPage() {
  const documents = await getPublishedDocuments();

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs uppercase tracking-[0.28em] text-amber-600">Publikasi Internal</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-slate-950">
          Dokumen published dan revoked
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Pantau token verifikasi yang sedang aktif dan histori dokumen yang telah direvoke.
        </p>
      </section>

      <SectionCard title="Daftar publikasi" description={`${documents.length} dokumen`}>
        <div className="space-y-4">
          {documents.map((document) => (
            <Link
              key={document.id}
              href={`/documents/${document.id}`}
              className="block rounded-[28px] border border-slate-100 bg-slate-50/80 px-5 py-5 transition hover:border-slate-200 hover:bg-white"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-slate-900">{document.title}</h2>
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
