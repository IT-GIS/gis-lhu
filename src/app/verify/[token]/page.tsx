import { FormTypeBadge } from "@/components/form-type-badge";
import { StatusBadge } from "@/components/status-badge";
import { resolveVerificationToken } from "@/lib/documents";
import { getVerificationView } from "@/lib/verification";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ token: string }>;

export const dynamic = "force-dynamic";

export default async function VerifyPage({
  params,
}: {
  params: Params;
}) {
  const { token } = await params;
  const verification = await resolveVerificationToken(token);
  const view = getVerificationView({
    tokenExists: Boolean(verification),
    isActive: Boolean(verification?.isActive && verification?.document.status === "published"),
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_24%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_100%)] px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-[36px] border border-white/60 bg-white/90 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.12)]">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Verifikasi Publik GIS LHU</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-slate-950">
            {view.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">{view.description}</p>
        </section>

        {verification ? (
          <section className="rounded-[36px] border border-white/60 bg-white/90 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.12)]">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={verification.document.status} />
              <FormTypeBadge formType={verification.document.formType} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
                <p className="text-sm text-slate-500">Nomor dokumen</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {verification.document.documentNumber}
                </p>
              </div>
              <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
                <p className="text-sm text-slate-500">Judul dokumen</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {verification.document.title}
                </p>
              </div>
              <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
                <p className="text-sm text-slate-500">Tanggal publish</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {formatDate(verification.publishedAt)}
                </p>
              </div>
              <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
                <p className="text-sm text-slate-500">Token</p>
                <p className="mt-2 break-all font-mono text-sm text-slate-900">{verification.token}</p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-500">
              Halaman ini hanya menampilkan data minimum yang aman untuk verifikasi publik.
            </p>
          </section>
        ) : (
          <section className="rounded-[36px] border border-white/60 bg-white/90 p-8 text-sm leading-7 text-slate-600 shadow-[0_40px_120px_rgba(15,23,42,0.12)]">
            Token yang Anda akses tidak tersedia di sistem GIS LHU. Pastikan tautan berasal dari dokumen resmi yang diterbitkan laboratorium.
          </section>
        )}
      </div>
    </div>
  );
}
