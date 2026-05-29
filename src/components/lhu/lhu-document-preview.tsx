import Image from "next/image";

import type { AppFormType } from "@/lib/domain";
import { getResultColumns, type LhuPayload } from "@/lib/lhu-payload";

type LhuDocumentPreviewProps = {
  formType: AppFormType;
  payload: LhuPayload;
  documentNumber?: string;
  className?: string;
};

const labelClass = "font-semibold text-slate-950";

function InfoLine({ number, label, value, indent = false }: { number: string; label: string; value?: string | null; indent?: boolean }) {
  return (
    <div className={`grid grid-cols-[72px_minmax(170px,230px)_1fr] gap-2 text-sm leading-6 ${indent ? "pl-8" : ""}`}>
      <span>{number}</span>
      <span>{label}</span>
      <span>: {value || "-"}</span>
    </div>
  );
}

export function LhuDocumentPreview({
  formType,
  payload,
  documentNumber,
  className = "",
}: LhuDocumentPreviewProps) {
  const columns = getResultColumns(formType);

  return (
    <article className={`relative h-[297mm] w-[210mm] overflow-hidden bg-white text-slate-950 ${className}`}>
      <div className="pointer-events-none absolute inset-4 border-[3px] border-double border-[#2f5496]" />
      <div className="pointer-events-none absolute inset-7 border border-[#2f5496]/80" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-[28px] border-[#2f5496]/5" />

      <div className="relative z-10 px-7 py-6">
        <header className="pb-4">
          <div className="grid grid-cols-[92px_1fr_118px] items-center gap-4">
            <div className="flex justify-start">
              <Image
                src="/templates/lhu-media/image4.png"
                alt="PT Global Inspeksi Sistem"
                width={86}
                height={86}
                className="h-20 w-20 object-contain"
                unoptimized
              />
            </div>
            <div className="text-center">
              <p className="text-[23px] font-extrabold uppercase leading-tight tracking-wide text-[#2f5496]">
                PT GLOBAL INSPEKSI SISTEM
              </p>
              <p className="mt-1 text-[11px] leading-5 text-slate-800">
                Jl. Daan Mogot No.89, RT.002 RW.002 Kel. Wijaya Kusuma, Kec. Grogol Petamburan,
              </p>
              <p className="text-[11px] leading-5 text-slate-800">
                Kota Jakarta Barat, Provinsi DKI Jakarta-11460
              </p>
              <p className="text-[11px] leading-5 text-[#2f5496]">Email : gislaboratorium@gmail.com</p>
            </div>
            <div className="flex justify-end">
              <Image
                src="/templates/lhu-media/kan-logo.png"
                alt="Komite Akreditasi Nasional"
                width={150}
                height={42}
                className="h-auto w-32 object-contain"
                unoptimized
              />
            </div>
          </div>
          <div className="mt-3 h-[3px] bg-[#2f5496]" />
          <div className="mt-1 h-px bg-[#2f5496]" />
      </header>

      <section className="pt-6 text-sm">
        <h1 className="text-center text-xl font-bold uppercase">REPORT OF ANALYSIS</h1>
        <p className="text-center font-semibold">Laporan Hasil Pengujian</p>
        <p className="mt-2 text-center font-semibold">No. {payload.reportNo || documentNumber || "-"}</p>
        <p className="mt-4 font-semibold">No. Order/ Nomor Pekerjaan: {payload.orderNo || "-"}</p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className={labelClass}>II.Principal / Pelanggan</h2>
        <InfoLine number="2.1." label="Name / Nama" value={payload.principal.name} />
        <InfoLine number="2.2." label="Address / Alamat" value={payload.principal.address} />
      </section>

      <section className="mt-6 space-y-2">
        <h2 className={labelClass}>III. Sample / Contoh Uji</h2>
        <InfoLine number="3.1." label="Sample Number/ Nomor Contoh" value={payload.sample.sampleNo} />
        <InfoLine number="3.2." label="Sample Name / Nama Contoh" value={payload.sample.sampleName} />
        <InfoLine number="3.3." label="Packaging / Kemasan" value={payload.sample.packaging} />
        <p className={labelClass}>3.4. Other Information / Keterangan lain</p>
        <div className="space-y-1">
          <InfoLine number="3.4.1." label="Commodity/Komoditi" value={payload.sample.commodity} indent />
          <InfoLine number="3.4.2." label="Type/ Jenis" value={payload.sample.type} indent />
          {payload.sample.additionalInfo.map((item, index) => (
            <InfoLine
              key={`${item.label}-${index}`}
              number={`3.4.${index + 3}.`}
              label={item.label || "Informasi"}
              value={item.value}
              indent
            />
          ))}
        </div>
        <InfoLine number="3.5." label="Date of Received/Tanggal Terima" value={payload.receivedDate} />
        <InfoLine number="3.6." label="Date of Analysis /Tanggal Uji" value={payload.analysisDate} />
        <InfoLine number="3.7." label="Sampling/Pengambilan Sample" value={payload.sample.sampling} />
      </section>

      <section className="mt-6">
        <h2 className={labelClass}>IV. Result / Hasil Uji:</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} className="border border-slate-950 px-2 py-2 text-center font-bold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payload.results.map((row, index) => (
                <tr key={index}>
                  <td className="border border-slate-950 px-2 py-2 text-center">{index + 1}</td>
                  <td className="border border-slate-950 px-2 py-2">{row.parameter || "-"}</td>
                  <td className="border border-slate-950 px-2 py-2 text-center">{row.unit || "-"}</td>
                  {formType === "TYPE_1" ? (
                    <td className="border border-slate-950 px-2 py-2 text-center">{row.specification || "-"}</td>
                  ) : null}
                  <td className="border border-slate-950 px-2 py-2 text-center">{row.result || "-"}</td>
                  <td className="border border-slate-950 px-2 py-2">{row.methods || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {payload.notes ? <p className="mt-4 whitespace-pre-line text-xs leading-5">Catatan : {payload.notes}</p> : null}
      </section>

      <section className="mt-10 flex justify-end text-sm">
        <div className="w-64 text-center">
          <p>
            {payload.issue.place || "Jakarta"}, {payload.issue.date || "-"}
          </p>
          <p className="mt-2">{payload.signer.company || "PT. Global Inspeksi Sistem"}</p>
          <div className="h-24" />
          <p className="font-semibold underline underline-offset-4">{payload.signer.name || "Wina"}</p>
          <p>{payload.signer.title || "Technical Manager"}</p>
        </div>
      </section>

      <footer className="mt-8 border-t border-slate-300 pt-3 text-xs text-slate-600">
        <div className="flex items-center justify-between gap-4">
          <span>GIS-LAB-FRM-016/Rev.0</span>
          <span>{documentNumber ?? ""}</span>
        </div>
      </footer>
      </div>
    </article>
  );
}
