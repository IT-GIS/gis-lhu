import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { resolveVerificationToken } from "@/lib/documents";
import { getResultColumns, resolveLhuPayload, type LhuPayload, usesLimitResultTable, usesNumberColumn, usesSamplingField, usesSpecificationColumn, usesUnitColumn } from "@/lib/lhu-payload";
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
    <div className="min-w-0 border-b border-slate-200 py-4 sm:grid sm:grid-cols-[minmax(150px,0.42fr)_1fr] sm:gap-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-base font-semibold leading-7 text-slate-950 sm:mt-0">{value || "-"}</p>
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
    <section className="border-t border-slate-200 pt-9 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-sky-600" aria-hidden="true" />
        <h2 className="text-sm font-extrabold uppercase tracking-[0.08em] text-slate-950 sm:text-base">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function LaboratoryIdentityCard() {
  return (
    <section className="rounded-lg border border-sky-100 bg-white px-6 py-7 shadow-sm sm:px-8 lg:px-10">
      <div className="grid gap-5 lg:grid-cols-[max-content_minmax(0,1fr)_260px] lg:items-center lg:gap-6">
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/logo-lab-GIS.png"
            alt="PT Global Inspeksi Sistem"
            width={260}
            height={282}
            className="h-auto w-48 object-contain sm:w-60 lg:w-37"
            priority
            unoptimized
          />
        </div>
        <div className="max-w-2xl text-left">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-tight text-[#253f92] sm:whitespace-nowrap sm:text-[30px]">
            PT GLOBAL INSPEKSI SISTEM
          </h1>
          <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-slate-700 sm:text-[16px]">
            <span className="block">Jl. Pahlawan No.2, Kwadengan Barat, Lemahputro, Kec. Sidoarjo,</span>
            <span className="block">Kabupaten Sidoarjo, Jawa Timur 61213</span>
          </p>
          <p className="mt-1 text-base font-semibold leading-7 text-slate-800 sm:text-[16px]">
            Email: <span className="text-[#253f92]">gislaboratorium@gmail.com</span>
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/kan-lp-1784-idn.png"
            alt="Komite Akreditasi Nasional LP-1784-IDN"
            width={260}
            height={138}
            className="h-auto w-52 object-contain sm:w-64"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

function AdditionalInfoList({ formType, payload }: { formType: NonNullable<Awaited<ReturnType<typeof resolveVerificationToken>>>["document"]["formType"]; payload: LhuPayload }) {
  const items = ([
    { label: "Sample Number / Nomor Contoh", value: payload.sample.sampleNo },
    { label: "Sample Name / Nama Contoh", value: payload.sample.sampleName },
    { label: "Packaging / Kemasan", value: payload.sample.packaging },
    ...payload.sample.additionalInfo.map((item) => ({
      label: item.label || "Informasi",
      value: item.value,
    })),
    { label: "Date of Received / Tanggal Terima", value: payload.receivedDate },
    { label: "Date of Analysis / Tanggal Uji", value: payload.analysisDate },
    payload.sample.sniNo?.trim()
      ? { label: "Number of SNI / Nomor SNI", value: payload.sample.sniNo }
      : usesSamplingField(formType)
        ? { label: "Sampling / Pengambilan Sample", value: payload.sample.sampling }
        : null,
  ] as Array<{ label: string; value?: string | null } | null>).filter((item): item is { label: string; value?: string | null } => Boolean(item?.value?.trim()));

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
  const usesLimitTable = usesLimitResultTable(formType);
  const usesNumber = usesNumberColumn(formType);
  const usesSpecification = usesSpecificationColumn(formType);
  const usesUnit = usesUnitColumn(formType);

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        {formType === "TYPE_3" ? (
          <thead className="bg-slate-900 text-white">
            <tr>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">NO</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">PARAMETER</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">METHOD</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">UNIT</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">RESULT</th>
              <th colSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">LIMIT (CF)</th>
              <th colSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">LIMIT (SF)</th>
            </tr>
            <tr>
              <th className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">MIN</th>
              <th className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">MAX</th>
              <th className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">MIN</th>
              <th className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">MAX</th>
            </tr>
          </thead>
        ) : formType === "TYPE_4" ? (
          <thead className="bg-slate-900 text-white">
            <tr>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">NO</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">PARAMETER</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">METHOD</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">UNIT</th>
              <th rowSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">RESULT</th>
              <th colSpan={2} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">LIMIT (TB)</th>
            </tr>
            <tr>
              <th className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">MIN</th>
              <th className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">MAX</th>
            </tr>
          </thead>
        ) : (
          <thead className="bg-slate-900 text-white">
            <tr>
              {columns.map((column) => (
                <th key={column} className="border border-slate-800 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.12em]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {payload.results.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-50">
              {usesNumber ? <td className="border border-slate-200 px-4 py-3 font-semibold text-slate-900">{usesLimitTable ? row.no || "" : index + 1}</td> : null}
              <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.parameter || "-"}</td>
              {usesLimitTable ? (
                <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.methods || "-"}</td>
              ) : null}
              {usesUnit ? <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.unit || "-"}</td> : null}
              {usesSpecification ? (
                <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.specification || "-"}</td>
              ) : null}
              <td className="border border-slate-200 px-4 py-3 font-semibold text-slate-950">{row.result || "-"}</td>
              {formType === "TYPE_3" ? (
                <>
                  <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.limitCfMin || "-"}</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.limitCfMax || "-"}</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.limitSfMin || "-"}</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.limitSfMax || "-"}</td>
                </>
              ) : formType === "TYPE_4" ? (
                <>
                  <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.limitTbMin || "-"}</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.limitTbMax || "-"}</td>
                </>
              ) : (
                <td className="border border-slate-200 px-4 py-3 text-slate-800">{row.methods || "-"}</td>
              )}
            </tr>
          ))}
          {payload.resultFooter ? (
            <tr className="bg-sky-50">
              <td colSpan={columns.length} className="whitespace-pre-line border border-slate-200 px-4 py-3 font-semibold text-slate-900">
                {payload.resultFooter}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function SignatureBlock({ payload }: { payload: LhuPayload }) {
  return (
    <div className="flex justify-start md:justify-end">
      <div className="w-full max-w-sm border-t border-slate-200 pt-6 text-left md:text-center">
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
  const isPubliclyVerified = Boolean(verification?.isActive);
  const reportNo = payload?.reportNo || verification?.document.referenceNo || "-";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef6ff_48%,_#f8fafc_100%)] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        {verification && payload && isPubliclyVerified ? (
          <>
            <section className="mx-auto max-w-4xl rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-5 text-emerald-900">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-base font-extrabold text-emerald-950 sm:text-lg">{view.title}</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-800">{view.description}</p>
                </div>
              </div>
            </section>

            <LaboratoryIdentityCard />

            <article className="rounded-lg border border-slate-200 bg-white">
              <div className="p-6 sm:p-8">
              <div className="space-y-8">
                <PublicSection title="Data Verifikasi Dokumen">
                  <div className="grid gap-x-8 md:grid-cols-2">
                    <FieldBlock label="No. Laporan Hasil Uji" value={reportNo} />
                    <FieldBlock label="Tanggal barcode aktif" value={formatDate(verification.publishedAt)} />
                  </div>
                </PublicSection>

                <PublicSection title="I. Report of Analysis / Laporan Hasil Pengujian">
                  <div className="grid gap-x-8 md:grid-cols-2">
                    <FieldBlock label="No. Order / Nomor Pekerjaan" value={payload.orderNo} />
                  </div>
                </PublicSection>

                <PublicSection title="II. Principal / Pelanggan">
                  <div className="grid gap-x-8 md:grid-cols-2">
                    <FieldBlock label="Name / Nama" value={payload.principal.name} />
                    <FieldBlock label="Address / Alamat" value={payload.principal.address} />
                  </div>
                </PublicSection>

                <PublicSection title="III. Sample / Contoh Uji">
                  <AdditionalInfoList formType={verification.document.formType} payload={payload} />
                </PublicSection>

                <PublicSection title="IV. Result / Hasil Uji">
                  <ResultTable formType={verification.document.formType} payload={payload} />
                  {payload.notes ? (
                    <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-5 text-sm leading-7 text-amber-950">
                      <p className="font-bold">Catatan</p>
                      <p className="mt-2 whitespace-pre-line">{payload.notes}</p>
                    </div>
                  ) : null}
                </PublicSection>

                <PublicSection title="Penerbit dan Penanggung Jawab">
                  <SignatureBlock payload={payload} />
                </PublicSection>
              </div>
              </div>
            </article>
          </>
        ) : (
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="h-1.5 bg-slate-300" aria-hidden="true" />
            <div className="p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-700">Verifikasi Publik GIS LHU</p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {view.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600">{view.description}</p>
              <p className="mt-6 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600">
                Tautan yang Anda akses belum tersedia sebagai dokumen aktif di sistem verifikasi publik. Pastikan tautan berasal dari barcode LHU yang tersimpan di sistem.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
