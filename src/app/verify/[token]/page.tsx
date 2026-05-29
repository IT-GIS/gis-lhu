import { resolveVerificationToken } from "@/lib/documents";
import { getResultColumns, resolveLhuPayload, type LhuPayload } from "@/lib/lhu-payload";
import { getVerificationView } from "@/lib/verification";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ token: string }>;

export const dynamic = "force-dynamic";

function FieldBlock({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-base font-semibold leading-7 text-slate-950">{value || "-"}</p>
    </div>
  );
}

function PublicSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-slate-200 pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-slate-950 sm:text-base">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function AdditionalInfoList({ payload }: { payload: LhuPayload }) {
  const items = [
    { label: "Sample Number / Nomor Contoh", value: payload.sample.sampleNo },
    { label: "Sample Name / Nama Contoh", value: payload.sample.sampleName },
    { label: "Packaging / Kemasan", value: payload.sample.packaging },
    { label: "Commodity / Komoditi", value: payload.sample.commodity },
    { label: "Type / Jenis", value: payload.sample.type },
    ...payload.sample.additionalInfo.map((item) => ({
      label: item.label || "Informasi",
      value: item.value,
    })),
    { label: "Date of Received / Tanggal Terima", value: payload.receivedDate },
    { label: "Date of Analysis / Tanggal Uji", value: payload.analysisDate },
    { label: "Sampling / Pengambilan Sample", value: payload.sample.sampling },
  ].filter((item) => item.value?.trim());

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <FieldBlock key={`${item.label}-${index}`} label={item.label} value={item.value} />
      ))}
    </div>
  );
}

function ResultTable({
  formType,
  payload,
}: {
  formType: NonNullable<Awaited<ReturnType<typeof resolveVerificationToken>>>["document"]["formType"];
  payload: LhuPayload;
}) {
  const columns = getResultColumns(formType);

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead className="bg-slate-950 text-white">
          <tr>
            {columns.map((column) => (
              <th key={column} className="border border-slate-800 px-3 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payload.results.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-50">
              <td className="border border-slate-200 px-3 py-3 font-semibold text-slate-900">{index + 1}</td>
              <td className="border border-slate-200 px-3 py-3 text-slate-800">{row.parameter || "-"}</td>
              <td className="border border-slate-200 px-3 py-3 text-slate-800">{row.unit || "-"}</td>
              {formType === "TYPE_1" ? (
                <td className="border border-slate-200 px-3 py-3 text-slate-800">{row.specification || "-"}</td>
              ) : null}
              <td className="border border-slate-200 px-3 py-3 font-semibold text-slate-950">{row.result || "-"}</td>
              <td className="border border-slate-200 px-3 py-3 text-slate-800">{row.methods || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SignatureBlock({ payload }: { payload: LhuPayload }) {
  return (
    <div className="flex justify-start md:justify-end">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50/70 px-6 py-6 text-left md:text-center">
        <p className="text-base font-semibold leading-7 text-slate-950">
          {payload.issue.place || "Jakarta"}, {payload.issue.date || "-"}
        </p>
        <p className="mt-2 text-sm font-semibold leading-7 text-slate-800">
          {payload.signer.company || "PT. Global Inspeksi Sistem"}
        </p>
        <div className="h-24" aria-hidden="true" />
        <p className="text-base font-bold text-slate-950 underline underline-offset-4">
          {payload.signer.name || "Wina"}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          {payload.signer.title || "Technical Manager"}
        </p>
      </div>
    </div>
  );
}

export default async function VerifyPage({
  params,
}: {
  params: Params;
}) {
  const { token } = await params;
  const verification = await resolveVerificationToken(token);
  const view = getVerificationView({
    tokenExists: Boolean(verification),
    isActive: Boolean(verification?.isActive),
  });
  const payload = verification
    ? resolveLhuPayload(verification.document.formType, verification.document.formPayload)
    : null;
  const principalName = payload?.principal.name || verification?.document.clientName || verification?.document.title;
  const reportNo = payload?.reportNo || verification?.document.referenceNo || "-";
  const sampleName = payload?.sample.sampleName || verification?.document.sampleName || "-";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_24%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_100%)] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {verification && payload ? (
          <>
            <section className="rounded-lg border border-white/70 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Verifikasi Publik GIS LHU</p>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {view.title}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600">{view.description}</p>
              </div>
            </section>

            <article className="rounded-lg border border-white/70 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
              <div className="space-y-8">
                <PublicSection title="Data Verifikasi Dokumen">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FieldBlock label="Nomor dokumen" value={verification.document.documentNumber} />
                    <FieldBlock label="Nomor laporan" value={reportNo} />
                    <FieldBlock label="Tanggal barcode aktif" value={formatDate(verification.publishedAt)} />
                  </div>
                </PublicSection>

                <PublicSection title="I. Report of Analysis / Laporan Hasil Pengujian">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FieldBlock label="No. Report / Nomor Laporan" value={payload.reportNo} />
                    <FieldBlock label="No. Order / Nomor Pekerjaan" value={payload.orderNo} />
                    <FieldBlock label="Principal / Pelanggan" value={principalName} />
                    <FieldBlock label="Sample / Contoh Uji" value={sampleName} />
                  </div>
                </PublicSection>

                <PublicSection title="II. Principal / Pelanggan">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FieldBlock label="Name / Nama" value={payload.principal.name} />
                    <FieldBlock label="Address / Alamat" value={payload.principal.address} />
                  </div>
                </PublicSection>

                <PublicSection title="III. Sample / Contoh Uji">
                  <AdditionalInfoList payload={payload} />
                </PublicSection>

                <PublicSection title="IV. Result / Hasil Uji">
                  <ResultTable formType={verification.document.formType} payload={payload} />
                  {payload.notes ? (
                    <div className="mt-5 border-t border-amber-200 bg-amber-50/70 px-4 py-5 text-sm leading-7 text-amber-950">
                      <p className="font-bold">Catatan</p>
                      <p className="mt-2 whitespace-pre-line">{payload.notes}</p>
                    </div>
                  ) : null}
                </PublicSection>

                <PublicSection title="Penerbit dan Penanggung Jawab">
                  <SignatureBlock payload={payload} />
                </PublicSection>
              </div>
            </article>
          </>
        ) : (
          <section className="rounded-lg border border-white/70 bg-white/95 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
            <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Verifikasi Publik GIS LHU</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {view.title}
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">{view.description}</p>
            <p className="mt-6 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600">
              Token yang Anda akses tidak tersedia di sistem GIS LHU. Pastikan tautan berasal dari dokumen resmi yang terdaftar di sistem laboratorium.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
