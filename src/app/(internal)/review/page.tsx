import Link from "next/link";

import { FormTypeBadge } from "@/components/form-type-badge";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getReviewQueue } from "@/lib/documents";
import { canReviewDocument } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

export default async function ReviewPage() {
  const user = await requireAuthenticatedUser();
  const queue = await getReviewQueue();

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs uppercase tracking-[0.28em] text-amber-600">Review QA</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-slate-950">
          Antrian dokumen untuk QA
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          QA dan supervisor dapat memberikan komentar, approve, atau mengembalikan revisi dari halaman detail dokumen.
        </p>
      </section>

      <SectionCard
        title="Dokumen status review"
        description={
          canReviewDocument(user.role)
            ? `${queue.length} dokumen siap direview`
            : "Role ini tidak memiliki izin untuk melakukan aksi review"
        }
      >
        <div className="space-y-4">
          {queue.length ? (
            queue.map((document) => (
              <Link
                key={document.id}
                href={`/documents/${document.id}`}
                className="block rounded-[28px] border border-slate-100 bg-slate-50/80 px-5 py-5 transition hover:border-slate-200 hover:bg-white"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-slate-900">{document.title}</h2>
                      <StatusBadge status={document.status} />
                      <FormTypeBadge formType={document.formType} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                      <span>{document.documentNumber}</span>
                      <span>Creator: {document.creator.name}</span>
                      <span>Assignee: {document.assignedTo?.name ?? "-"}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">Updated {formatDate(document.updatedAt)}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
              Belum ada dokumen yang sedang menunggu review.
            </p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
