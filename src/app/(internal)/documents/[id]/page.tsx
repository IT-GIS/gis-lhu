import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateDocumentAction } from "@/actions/documents";
import { FlashMessage } from "@/components/flash-message";
import { FormTypeBadge } from "@/components/form-type-badge";
import { LhuDocumentForm } from "@/components/lhu/lhu-document-form";
import { LhuDocumentPreview } from "@/components/lhu/lhu-document-preview";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getDocumentDetail, getRecentAuditLog } from "@/lib/documents";
import { resolveLhuPayload } from "@/lib/lhu-payload";
import { canEditDocument } from "@/lib/permissions";
import { buildVerificationQrCode, buildVerificationUrl } from "@/lib/verification";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

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

  const [document, auditLog] = await Promise.all([
    getDocumentDetail(id, user.role),
    getRecentAuditLog(id),
  ]);

  if (!document) {
    notFound();
  }

  const error = typeof query.error === "string" ? query.error : undefined;
  const success = typeof query.success === "string" ? query.success : undefined;
  const canEdit = canEditDocument(user.role, document.status);
  const lhuPayload = resolveLhuPayload(document.formType, document.formPayload);
  const verifyUrl = document.verification
    ? buildVerificationUrl(document.verification.token)
    : null;
  const qrCode =
    document.verification?.isActive && document.verification?.token
      ? await buildVerificationQrCode(document.verification.token)
      : null;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title={document.title}
        description={`Dibuat ${formatDate(document.createdAt)} / Diupdate ${formatDate(document.updatedAt)} / Creator: ${document.creator.name}`}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={document.status} />
            <FormTypeBadge formType={document.formType} />
            <Button asChild variant="outline" size="sm">
              <Link href={`/documents/${document.id}/print`} target="_blank">
                Print/PDF
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/documents/${document.id}/export/docx`}>
                Download DOCX
              </Link>
            </Button>
            {document.verification ? (
              <Button asChild variant="outline" size="sm">
                <Link href={`/documents/${document.id}/barcode`}>
                  Download Barcode
                </Link>
              </Button>
            ) : null}
          </div>
        }
      />

      <FlashMessage error={error} success={success} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <SectionCard title="Form LHU" description="Data laporan, pelanggan, sampel, hasil uji, dan tanda tangan.">
            <LhuDocumentForm
              action={updateDocumentAction}
              submitLabel="Simpan Perubahan"
              documentId={document.id}
              initialFormType={document.formType}
              initialPayload={lhuPayload}
              canEdit={canEdit}
              canChangeFormType={canEdit && document.status === "draft"}
            />
          </SectionCard>

          <SectionCard title="Preview LHU" description="Tampilan kertas A4 mendekati dokumen Laporan Hasil Pengujian sebelum export.">
            <div className="overflow-x-auto rounded-[24px] border border-slate-200 bg-slate-100 p-4 shadow-sm">
              <LhuDocumentPreview
                formType={document.formType}
                payload={lhuPayload}
                documentNumber={document.documentNumber}
                className="mx-auto shadow-[0_18px_60px_rgba(15,23,42,0.18)]"
              />
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Barcode verifikasi" description="QR aktif sejak LHU dibuat dan tersimpan di sistem">
            {document.verification ? (
              <div className="space-y-4">
                <div className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                  <p className="text-sm text-slate-500">Status token</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {document.verification.isActive ? "Aktif" : "Tidak aktif"}
                  </p>
                  <p className="mt-3 break-all font-mono text-sm text-slate-700">{document.verification.token}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Dibuat/aktif {formatDate(document.verification.publishedAt)}
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

                <Button asChild variant="outline" className="w-full">
                  <Link href={`/documents/${document.id}/barcode`}>Download Barcode PNG</Link>
                </Button>
              </div>
            ) : (
              <p className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
                Barcode belum tersedia untuk dokumen lama ini. Buat dokumen baru agar barcode aktif otomatis.
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
                      {entry.actor?.name ?? "Sistem"} / {formatDate(entry.createdAt)}
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
