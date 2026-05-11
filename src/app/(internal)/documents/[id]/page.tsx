import Image from "next/image";
import { notFound } from "next/navigation";

import {
  addReviewCommentAction,
  transitionDocumentAction,
  updateDocumentAction,
} from "@/actions/documents";
import { FlashMessage } from "@/components/flash-message";
import { FormTypeBadge } from "@/components/form-type-badge";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getAssignableUsers, getDocumentDetail, getRecentAuditLog } from "@/lib/documents";
import { formTypeLabels, formTypes, roleLabels } from "@/lib/domain";
import {
  canEditDocument,
  canPublishDocument,
  canReviewDocument,
  canRevokeDocument,
  canSubmitForReview,
} from "@/lib/permissions";
import { buildVerificationQrCode, buildVerificationUrl } from "@/lib/verification";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const reviewActionLabels = {
  SUBMIT: "Submit ke review",
  RETURN_REVISI: "Kembali ke revisi",
  APPROVE: "Approve",
  COMMENT: "Komentar review",
} as const;

export default async function DocumentDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const user = await requireAuthenticatedUser();
  const { id } = await params;
  const query = await searchParams;

  const [document, auditLog, assignableUsers] = await Promise.all([
    getDocumentDetail(id, user.role),
    getRecentAuditLog(id),
    getAssignableUsers(),
  ]);

  if (!document) {
    notFound();
  }

  const error = typeof query.error === "string" ? query.error : undefined;
  const success = typeof query.success === "string" ? query.success : undefined;
  const canEdit = canEditDocument(user.role, document.status);
  const canSubmit = canSubmitForReview(user.role, document.status);
  const canReview = canReviewDocument(user.role) && document.status === "review";
  const canPublish = canPublishDocument(user.role) && document.status === "approved";
  const canRevoke = canRevokeDocument(user.role) && document.status === "published";
  const canMoveToInput =
    canEdit && (document.status === "draft" || document.status === "revisi");
  const verifyUrl = document.verification
    ? buildVerificationUrl(document.verification.token)
    : null;
  const qrCode =
    document.verification?.isActive && document.verification?.token
      ? await buildVerificationQrCode(document.verification.token)
      : null;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <section className="rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-amber-600">Detail Dokumen</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-slate-950">
              {document.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={document.status} />
              <FormTypeBadge formType={document.formType} />
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {document.documentNumber}
              </span>
            </div>
          </div>
          <div className="grid gap-2 text-sm text-slate-500">
            <span>Dibuat: {formatDate(document.createdAt)}</span>
            <span>Diupdate: {formatDate(document.updatedAt)}</span>
            <span>Creator: {document.creator.name}</span>
            <span>Assignee: {document.assignedTo?.name ?? "-"}</span>
          </div>
        </div>
      </section>

      <FlashMessage error={error} success={success} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <SectionCard title="Metadata inti" description="Data inti dokumen yang tetap terpisah dari payload form fleksibel">
            <form action={updateDocumentAction} className="grid gap-5 lg:grid-cols-2">
              <input type="hidden" name="documentId" value={document.id} />

              <label className="block lg:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-700">Judul dokumen</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm disabled:bg-slate-100"
                  type="text"
                  name="title"
                  defaultValue={document.title}
                  disabled={!canEdit}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Tipe form</span>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm disabled:bg-slate-100"
                  name="formType"
                  defaultValue={document.formType}
                  disabled={!canEdit || document.status !== "draft"}
                >
                  {formTypes.map((type) => (
                    <option key={type} value={type}>
                      {formTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">PIC / assignee</span>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm disabled:bg-slate-100"
                  name="assignedToId"
                  defaultValue={document.assignedTo?.id ?? ""}
                  disabled={!canEdit}
                >
                  <option value="">Belum ditentukan</option>
                  {assignableUsers.map((assignee) => (
                    <option key={assignee.id} value={assignee.id}>
                      {assignee.name} ({roleLabels[assignee.role]})
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Nomor referensi</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm disabled:bg-slate-100"
                  type="text"
                  name="referenceNo"
                  defaultValue={document.referenceNo ?? ""}
                  disabled={!canEdit}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Nama klien</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm disabled:bg-slate-100"
                  type="text"
                  name="clientName"
                  defaultValue={document.clientName ?? ""}
                  disabled={!canEdit}
                />
              </label>

              <label className="block lg:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-700">Nama sampel</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm disabled:bg-slate-100"
                  type="text"
                  name="sampleName"
                  defaultValue={document.sampleName ?? ""}
                  disabled={!canEdit}
                />
              </label>

              <label className="block lg:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-700">Catatan</span>
                <textarea
                  className="min-h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm disabled:bg-slate-100"
                  name="notes"
                  defaultValue={document.notes ?? ""}
                  disabled={!canEdit}
                />
              </label>

              {canEdit ? (
                <div className="flex justify-end lg:col-span-2">
                  <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Simpan Perubahan
                  </button>
                </div>
              ) : (
                <p className="text-sm text-slate-500 lg:col-span-2">
                  Metadata hanya dapat diubah saat dokumen berada pada status editable dan sesuai izin role.
                </p>
              )}
            </form>
          </SectionCard>

          <SectionCard title="Placeholder form" description="Area ini sengaja tetap kosong sampai definisi field final ditetapkan">
            <div className="rounded-[24px] border border-dashed border-amber-200 bg-amber-50 px-5 py-5">
              <p className="font-medium text-amber-950">
                {formTypeLabels[document.formType]} belum memiliki field bawaan.
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-900">
                Workflow inti tetap berjalan menggunakan metadata dokumen dan payload form kosong.
              </p>
              <pre className="mt-4 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-amber-100">
                {JSON.stringify(document.formPayload, null, 2)}
              </pre>
            </div>
          </SectionCard>

          <SectionCard title="Riwayat review" description="Komentar dan aksi QA yang tercatat pada dokumen ini">
            <div className="space-y-4">
              {document.reviewEntries.length ? (
                document.reviewEntries.map((entry) => (
                  <div key={entry.id} className="rounded-[24px] border border-slate-100 bg-slate-50/80 px-5 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold text-slate-900">{reviewActionLabels[entry.action]}</p>
                      <span className="text-sm text-slate-500">{entry.reviewer.name}</span>
                      <span className="text-sm text-slate-400">{formatDate(entry.createdAt)}</span>
                    </div>
                    {entry.comment ? (
                      <p className="mt-3 text-sm leading-7 text-slate-600">{entry.comment}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
                  Belum ada komentar atau keputusan review untuk dokumen ini.
                </p>
              )}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Aksi workflow" description="Aksi yang tersedia disesuaikan dengan role dan status dokumen">
            <div className="space-y-4">
              {canMoveToInput ? (
                <form action={transitionDocumentAction} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                  <input type="hidden" name="documentId" value={document.id} />
                  <input type="hidden" name="nextStatus" value="input_hasil" />
                  <button className="w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                    Tandai sebagai Input Hasil
                  </button>
                </form>
              ) : null}

              {canSubmit ? (
                <form action={transitionDocumentAction} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                  <input type="hidden" name="documentId" value={document.id} />
                  <input type="hidden" name="nextStatus" value="review" />
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Catatan submit review</span>
                    <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" name="comment" placeholder="Tambahkan catatan singkat untuk QA bila diperlukan." />
                  </label>
                  <button className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Kirim ke Review QA
                  </button>
                </form>
              ) : null}

              {canReview ? (
                <>
                  <form action={addReviewCommentAction} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                    <input type="hidden" name="documentId" value={document.id} />
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-700">Komentar review</span>
                      <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm" name="comment" placeholder="Tambahkan catatan QA tanpa mengubah status." required />
                    </label>
                    <button className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                      Simpan Komentar
                    </button>
                  </form>

                  <form action={transitionDocumentAction} className="rounded-[24px] border border-rose-100 bg-rose-50/70 p-5">
                    <input type="hidden" name="documentId" value={document.id} />
                    <input type="hidden" name="nextStatus" value="revisi" />
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-rose-800">Catatan revisi</span>
                      <textarea className="min-h-28 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm shadow-sm" name="comment" placeholder="Jelaskan alasan revisi yang harus dilakukan." required />
                    </label>
                    <button className="mt-4 w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">
                      Kembalikan ke Revisi
                    </button>
                  </form>

                  <form action={transitionDocumentAction} className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-5">
                    <input type="hidden" name="documentId" value={document.id} />
                    <input type="hidden" name="nextStatus" value="approved" />
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-emerald-800">Catatan approval</span>
                      <textarea className="min-h-28 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm shadow-sm" name="comment" placeholder="Opsional: catatan approval untuk arsip internal." />
                    </label>
                    <button className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
                      Approve Dokumen
                    </button>
                  </form>
                </>
              ) : null}

              {canPublish ? (
                <form action={transitionDocumentAction} className="rounded-[24px] border border-teal-100 bg-teal-50/70 p-5">
                  <input type="hidden" name="documentId" value={document.id} />
                  <input type="hidden" name="nextStatus" value="published" />
                  <button className="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500">
                    Publish dan Buat Token Verifikasi
                  </button>
                </form>
              ) : null}

              {canRevoke ? (
                <form action={transitionDocumentAction} className="rounded-[24px] border border-zinc-200 bg-zinc-100 p-5">
                  <input type="hidden" name="documentId" value={document.id} />
                  <input type="hidden" name="nextStatus" value="revoked" />
                  <button className="w-full rounded-2xl bg-zinc-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700">
                    Revoke Dokumen
                  </button>
                </form>
              ) : null}

              {!canMoveToInput && !canSubmit && !canReview && !canPublish && !canRevoke ? (
                <p className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
                  Tidak ada aksi workflow yang tersedia untuk role dan status ini.
                </p>
              ) : null}
            </div>
          </SectionCard>

          <SectionCard title="Verifikasi publik" description="Token dan QR untuk validasi eksternal">
            {document.verification ? (
              <div className="space-y-4">
                <div className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                  <p className="text-sm text-slate-500">Status token</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {document.verification.isActive ? "Aktif" : "Tidak aktif"}
                  </p>
                  <p className="mt-3 font-mono text-sm text-slate-700">{document.verification.token}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Dipublish {formatDate(document.verification.publishedAt)}
                  </p>
                </div>

                {verifyUrl ? (
                  <a
                    href={verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-[24px] border border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-amber-950"
                  >
                    Buka halaman verifikasi publik
                    <p className="mt-1 break-all font-mono text-xs text-amber-800">{verifyUrl}</p>
                  </a>
                ) : null}

                {qrCode ? (
                  <div className="rounded-[24px] border border-slate-100 bg-white p-5">
                    <Image src={qrCode} width={280} height={280} alt="QR verifikasi dokumen" unoptimized />
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
                Token verifikasi akan dibuat ketika dokumen dipublish.
              </p>
            )}
          </SectionCard>

          <SectionCard title="Audit log" description="Jejak aktivitas untuk dokumen ini">
            <div className="space-y-3">
              {auditLog.length ? (
                auditLog.map((entry) => (
                  <div key={entry.id} className="rounded-[22px] border border-slate-100 bg-slate-50/80 px-4 py-4">
                    <p className="font-medium text-slate-900">{entry.action}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {entry.actor?.name ?? "Sistem"} · {formatDate(entry.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
                  Belum ada audit log untuk dokumen ini.
                </p>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
