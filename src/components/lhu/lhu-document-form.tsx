"use client";

import { FileText, Plus, Trash2, UploadCloud } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AppFormType, AppRole } from "@/lib/domain";
import { formTypeLabels, formTypes, roleLabels } from "@/lib/domain";
import {
  createEmptyLhuPayload,
  type LhuAdditionalInfo,
  type LhuPayload,
  type LhuResultRow,
} from "@/lib/lhu-payload";
import { parseLhuImportFile } from "@/lib/lhu-docx-parser";

type AssignableUser = {
  id: string;
  name: string;
  role: AppRole;
};

type LhuDocumentFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  assignableUsers: AssignableUser[];
  submitLabel: string;
  documentId?: string;
  initialAssignedToId?: string | null;
  initialFormType?: AppFormType;
  initialPayload?: LhuPayload;
  canEdit?: boolean;
  canChangeFormType?: boolean;
};

const labelClass = "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200";
const selectClass =
  "h-11 w-full rounded-2xl border border-[var(--color-border)] bg-white/90 px-4 text-sm outline-none transition focus:border-[var(--color-gis-blue)] dark:bg-slate-950/70 disabled:bg-slate-100 disabled:text-slate-500";

function mergePayloadForType(nextFormType: AppFormType, current: LhuPayload): LhuPayload {
  const defaults = createEmptyLhuPayload(nextFormType);

  return {
    ...defaults,
    reportNo: current.reportNo,
    orderNo: current.orderNo,
    receivedDate: current.receivedDate,
    analysisDate: current.analysisDate,
    issue: current.issue,
    principal: current.principal,
    sample: {
      ...defaults.sample,
      sampleNo: current.sample.sampleNo,
      sampleName: current.sample.sampleName,
      packaging: current.sample.packaging,
      commodity: current.sample.commodity,
      type: current.sample.type,
      sampling: current.sample.sampling || "-",
    },
    results: current.results.map((row) => ({
      ...row,
      specification: nextFormType === "TYPE_1" ? row.specification ?? "" : "",
    })),
    notes: current.notes,
    signer: current.signer,
  };
}

function updateAt<T>(items: T[], index: number, next: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? next : item));
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-slate-200 pt-6 first:border-t-0 first:pt-0 dark:border-slate-800 lg:grid-cols-[190px_1fr]">
      <div className="flex items-center gap-3 lg:block">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gis-blue)] text-sm font-bold text-white shadow-sm lg:mb-3">
          {number}
        </div>
        <h3 className="text-base font-bold text-[var(--color-gis-navy)] dark:text-slate-100">{title}</h3>
      </div>
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/55 p-4 dark:border-slate-800 dark:bg-slate-900/45 sm:p-5">
        {children}
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export function LhuDocumentForm({
  action,
  assignableUsers,
  submitLabel,
  documentId,
  initialAssignedToId = "",
  initialFormType = "TYPE_1",
  initialPayload,
  canEdit = true,
  canChangeFormType = canEdit,
}: LhuDocumentFormProps) {
  const [formType, setFormType] = useState<AppFormType>(initialFormType);
  const [payload, setPayload] = useState<LhuPayload>(
    initialPayload ?? createEmptyLhuPayload(initialFormType),
  );
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    tone: "idle" | "success" | "error" | "loading";
    message: string;
  }>({
    tone: "idle",
    message: "Upload file .docx atau .pdf untuk mengisi draft otomatis dari dokumen LHU.",
  });

  const setPayloadField = <K extends keyof LhuPayload>(key: K, value: LhuPayload[K]) => {
    setPayload((current) => ({ ...current, [key]: value }));
  };

  const setSampleField = <K extends keyof LhuPayload["sample"]>(
    key: K,
    value: LhuPayload["sample"][K],
  ) => {
    setPayload((current) => ({
      ...current,
      sample: {
        ...current.sample,
        [key]: value,
      },
    }));
  };

  const setPrincipalField = <K extends keyof LhuPayload["principal"]>(
    key: K,
    value: LhuPayload["principal"][K],
  ) => {
    setPayload((current) => ({
      ...current,
      principal: {
        ...current.principal,
        [key]: value,
      },
    }));
  };

  const setIssueField = <K extends keyof LhuPayload["issue"]>(
    key: K,
    value: LhuPayload["issue"][K],
  ) => {
    setPayload((current) => ({
      ...current,
      issue: {
        ...current.issue,
        [key]: value,
      },
    }));
  };

  const setSignerField = <K extends keyof LhuPayload["signer"]>(
    key: K,
    value: LhuPayload["signer"][K],
  ) => {
    setPayload((current) => ({
      ...current,
      signer: {
        ...current.signer,
        [key]: value,
      },
    }));
  };

  const setAdditionalInfo = (index: number, next: LhuAdditionalInfo) => {
    setPayload((current) => ({
      ...current,
      sample: {
        ...current.sample,
        additionalInfo: updateAt(current.sample.additionalInfo, index, next),
      },
    }));
  };

  const setResultRow = (index: number, next: LhuResultRow) => {
    setPayload((current) => ({
      ...current,
      results: updateAt(current.results, index, next),
    }));
  };

  const addResultRow = () => {
    setPayload((current) => ({
      ...current,
      results: [
        ...current.results,
        {
          parameter: "",
          unit: "",
          specification: formType === "TYPE_1" ? "" : undefined,
          result: "",
          methods: "",
        },
      ],
    }));
  };

  const importLhuFile = async (file?: File | null) => {
    if (!file) return;

    setImportStatus({
      tone: "loading",
      message: `Menganalisis ${file.name}...`,
    });

    try {
      const parsed = await parseLhuImportFile(file);
      setFormType(parsed.formType);
      setPayload(parsed.payload);
      setImportStatus({
        tone: "success",
        message: `${file.name} berhasil dianalisis sebagai ${formTypeLabels[parsed.formType]}. Form dan tabel sudah diisi otomatis.`,
      });
    } catch (error) {
      setImportStatus({
        tone: "error",
        message: error instanceof Error ? error.message : "File tidak dapat dianalisis.",
      });
    }
  };

  return (
    <form action={action} className="space-y-8">
      {documentId ? <input type="hidden" name="documentId" value={documentId} /> : null}
      <input type="hidden" name="formType" value={formType} />
      <input type="hidden" name="reportNo" value={payload.reportNo} />
      <input type="hidden" name="orderNo" value={payload.orderNo ?? ""} />
      <input type="hidden" name="receivedDate" value={payload.receivedDate ?? ""} />
      <input type="hidden" name="analysisDate" value={payload.analysisDate ?? ""} />
      <input type="hidden" name="issuePlace" value={payload.issue.place} />
      <input type="hidden" name="issueDate" value={payload.issue.date} />
      <input type="hidden" name="principalName" value={payload.principal.name} />
      <input type="hidden" name="principalAddress" value={payload.principal.address ?? ""} />
      <input type="hidden" name="sampleNo" value={payload.sample.sampleNo ?? ""} />
      <input type="hidden" name="sampleName" value={payload.sample.sampleName} />
      <input type="hidden" name="packaging" value={payload.sample.packaging ?? ""} />
      <input type="hidden" name="commodity" value={payload.sample.commodity ?? ""} />
      <input type="hidden" name="sampleType" value={payload.sample.type ?? ""} />
      <input type="hidden" name="sampling" value={payload.sample.sampling ?? ""} />
      <input type="hidden" name="additionalInfoJson" value={JSON.stringify(payload.sample.additionalInfo)} />
      <input type="hidden" name="resultsJson" value={JSON.stringify(payload.results)} />
      <input type="hidden" name="notes" value={payload.notes ?? ""} />
      <input type="hidden" name="signerCompany" value={payload.signer.company ?? ""} />
      <input type="hidden" name="signerName" value={payload.signer.name ?? ""} />
      <input type="hidden" name="signerTitle" value={payload.signer.title ?? ""} />

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white/75 p-4 dark:border-slate-800 dark:bg-slate-950/45 md:grid-cols-2 xl:grid-cols-3">
        {canEdit && canChangeFormType ? (
          <div className="md:col-span-2 xl:col-span-3">
            <label
              className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-6 text-center transition ${
                isDraggingFile
                  ? "border-[var(--color-gis-blue)] bg-sky-50 text-[var(--color-gis-navy)]"
                  : "border-slate-300 bg-slate-50/80 text-slate-600 hover:border-[var(--color-gis-blue)] hover:bg-sky-50/70"
              } dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-300`}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDraggingFile(true);
              }}
              onDragLeave={() => setIsDraggingFile(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDraggingFile(false);
                void importLhuFile(event.dataTransfer.files.item(0));
              }}
            >
              <input
                className="sr-only"
                type="file"
                accept=".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => {
                  void importLhuFile(event.target.files?.item(0));
                  event.currentTarget.value = "";
                }}
              />
              <UploadCloud className="mb-3 h-9 w-9 text-[var(--color-gis-blue)]" />
              <span className="text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-100">
                Drop file Word/PDF LHU di sini atau klik untuk upload
              </span>
              <span className="mt-1 text-xs text-slate-500">
                Sistem akan membaca tipe form, data pelanggan, sampel, tabel hasil, catatan, dan tanda tangan dari DOCX atau PDF berbasis teks.
              </span>
              <span
                className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  importStatus.tone === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : importStatus.tone === "error"
                      ? "bg-rose-50 text-rose-700"
                      : importStatus.tone === "loading"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-white text-slate-500"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                {importStatus.message}
              </span>
            </label>
          </div>
        ) : null}

        <Field label="Tipe form">
          <select
            className={selectClass}
            value={formType}
            disabled={!canChangeFormType}
            onChange={(event) => {
              const nextFormType = event.target.value as AppFormType;
              setFormType(nextFormType);
              setPayload((current) => mergePayloadForType(nextFormType, current));
            }}
          >
            {formTypes.map((type) => (
              <option key={type} value={type}>
                {formTypeLabels[type]}
              </option>
            ))}
          </select>
        </Field>

        <Field label="PIC / assignee">
          <select className={selectClass} name="assignedToId" defaultValue={initialAssignedToId ?? ""} disabled={!canEdit}>
            <option value="">Belum ditentukan</option>
            {assignableUsers.map((assignee) => (
              <option key={assignee.id} value={assignee.id}>
                {assignee.name} ({roleLabels[assignee.role]})
              </option>
            ))}
          </select>
        </Field>

        <Field label="No. LP / No. Laporan Hasil Uji">
          <Input value={payload.reportNo} onChange={(event) => setPayloadField("reportNo", event.target.value)} placeholder="LP/J-0024D/26" disabled={!canEdit} required />
        </Field>

        <Field label="Tempat terbit">
          <Input value={payload.issue.place} onChange={(event) => setIssueField("place", event.target.value)} disabled={!canEdit} required />
        </Field>

        <Field label="Tanggal terbit">
          <Input value={payload.issue.date} onChange={(event) => setIssueField("date", event.target.value)} placeholder="10 Maret 2026" disabled={!canEdit} required />
        </Field>
      </div>

      <FormSection number="1" title="Report / Laporan">
        <Field label="No. Order/ Nomor Pekerjaan">
          <Input value={payload.orderNo ?? ""} onChange={(event) => setPayloadField("orderNo", event.target.value)} placeholder="GIS2602HOF0025" disabled={!canEdit} />
        </Field>
      </FormSection>

      <FormSection number="2" title="Principal / Pelanggan">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Field label="Name / Nama">
            <Input value={payload.principal.name} onChange={(event) => setPrincipalField("name", event.target.value)} placeholder="PT Rolimex Kimia Nusamas" disabled={!canEdit} required />
          </Field>
          <Field label="Address / Alamat">
            <Textarea value={payload.principal.address ?? ""} onChange={(event) => setPrincipalField("address", event.target.value)} placeholder="Alamat pelanggan" disabled={!canEdit} />
          </Field>
        </div>
      </FormSection>

      <FormSection number="3" title="Sample / Contoh Uji">
        <div className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Sample Number/ Nomor Contoh">
              <Input value={payload.sample.sampleNo ?? ""} onChange={(event) => setSampleField("sampleNo", event.target.value)} placeholder="J/FE-0004" disabled={!canEdit} />
            </Field>
            <Field label="Sample Name / Nama Contoh">
              <Input value={payload.sample.sampleName} onChange={(event) => setSampleField("sampleName", event.target.value)} placeholder="Triple Super Phosphate (TSP)" disabled={!canEdit} required />
            </Field>
            <Field label="Packaging / Kemasan" className="lg:col-span-2">
              <Input value={payload.sample.packaging ?? ""} onChange={(event) => setSampleField("packaging", event.target.value)} placeholder="Plastik 2 kg" disabled={!canEdit} />
            </Field>
          </div>

          <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
            <h4 className="mb-4 text-sm font-bold text-[var(--color-gis-navy)] dark:text-slate-100">
              Other Information / Keterangan lain
            </h4>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Commodity/Komoditi">
                <Input value={payload.sample.commodity ?? ""} onChange={(event) => setSampleField("commodity", event.target.value)} placeholder={formType === "TYPE_1" ? "Fertilizer" : "FERTILIZER"} disabled={!canEdit} />
              </Field>
              <Field label="Type/ Jenis">
                <Input value={payload.sample.type ?? ""} onChange={(event) => setSampleField("type", event.target.value)} placeholder={formType === "TYPE_1" ? "Rock Phosphate" : "AMONIUM SULFAT"} disabled={!canEdit} />
              </Field>
            </div>

            <div className="mt-4 space-y-3">
              {payload.sample.additionalInfo.map((item, index) => {
                const valueIsLong =
                  item.label?.toLowerCase().includes("address") ||
                  item.label?.toLowerCase().includes("lokasi");

                return (
                  <div
                    key={index}
                    className="grid gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-950/55 lg:grid-cols-[minmax(190px,0.42fr)_minmax(0,1fr)_auto]"
                  >
                    <Input
                      value={item.label ?? ""}
                      onChange={(event) => setAdditionalInfo(index, { ...item, label: event.target.value })}
                      placeholder="Label"
                      disabled={!canEdit}
                    />
                    {valueIsLong ? (
                      <Textarea
                        className="min-h-[88px]"
                        value={item.value ?? ""}
                        onChange={(event) => setAdditionalInfo(index, { ...item, value: event.target.value })}
                        placeholder="Nilai"
                        disabled={!canEdit}
                      />
                    ) : (
                      <Input
                        value={item.value ?? ""}
                        onChange={(event) => setAdditionalInfo(index, { ...item, value: event.target.value })}
                        placeholder="Nilai"
                        disabled={!canEdit}
                      />
                    )}
                    {canEdit ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Hapus informasi tambahan"
                        onClick={() =>
                          setPayload((current) => ({
                            ...current,
                            sample: {
                              ...current.sample,
                              additionalInfo: current.sample.additionalInfo.filter((_, itemIndex) => itemIndex !== index),
                            },
                          }))
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {canEdit ? (
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() =>
                  setPayload((current) => ({
                    ...current,
                    sample: {
                      ...current.sample,
                      additionalInfo: [...current.sample.additionalInfo, { label: "", value: "" }],
                    },
                  }))
                }
              >
                <Plus className="h-4 w-4" />
                Tambah informasi
              </Button>
            ) : null}
          </div>

          <div className="grid gap-4 border-t border-slate-200 pt-5 dark:border-slate-800 lg:grid-cols-2">
            <Field label="Date of Received/Tanggal Terima">
              <Input value={payload.receivedDate ?? ""} onChange={(event) => setPayloadField("receivedDate", event.target.value)} placeholder="27 Februari 2026" disabled={!canEdit} />
            </Field>
            <Field label="Date of Analysis /Tanggal Uji">
              <Input value={payload.analysisDate ?? ""} onChange={(event) => setPayloadField("analysisDate", event.target.value)} placeholder="27 Februari - 09 Maret 2026" disabled={!canEdit} />
            </Field>
            <Field label="Sampling/Pengambilan Sample" className="lg:col-span-2">
              <Input value={payload.sample.sampling ?? ""} onChange={(event) => setSampleField("sampling", event.target.value)} placeholder="-" disabled={!canEdit} />
            </Field>
          </div>
        </div>
      </FormSection>

      <FormSection number="4" title="Result / Hasil Uji">
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/55">
            <table className="w-full min-w-[1040px] table-fixed border-collapse text-sm">
              <colgroup>
                <col className="w-[64px]" />
                <col className="w-[250px]" />
                <col className="w-[110px]" />
                {formType === "TYPE_1" ? <col className="w-[170px]" /> : null}
                <col className="w-[140px]" />
                <col className="w-[280px]" />
                {canEdit ? <col className="w-[64px]" /> : null}
              </colgroup>
              <thead className="bg-slate-100 text-xs font-bold uppercase tracking-[0.08em] text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-3 text-center dark:border-slate-800">NO</th>
                  <th className="border-b border-slate-200 px-3 py-3 text-left dark:border-slate-800">PARAMETER</th>
                  <th className="border-b border-slate-200 px-3 py-3 text-left dark:border-slate-800">UNIT</th>
                  {formType === "TYPE_1" ? (
                    <th className="border-b border-slate-200 px-3 py-3 text-left dark:border-slate-800">SPECIFICATION</th>
                  ) : null}
                  <th className="border-b border-slate-200 px-3 py-3 text-left dark:border-slate-800">RESULT</th>
                  <th className="border-b border-slate-200 px-3 py-3 text-left dark:border-slate-800">METHODS</th>
                  {canEdit ? <th className="border-b border-slate-200 px-3 py-3 dark:border-slate-800"> </th> : null}
                </tr>
              </thead>
              <tbody>
                {payload.results.map((row, index) => (
                  <tr key={index} className="border-t border-slate-100 align-top dark:border-slate-800">
                    <td className="px-3 py-3 text-center font-semibold text-slate-600 dark:text-slate-300">{index + 1}</td>
                    <td className="px-3 py-3">
                      <Input className="rounded-xl" value={row.parameter ?? ""} onChange={(event) => setResultRow(index, { ...row, parameter: event.target.value })} disabled={!canEdit} />
                    </td>
                    <td className="px-3 py-3">
                      <Input className="rounded-xl" value={row.unit ?? ""} onChange={(event) => setResultRow(index, { ...row, unit: event.target.value })} disabled={!canEdit} />
                    </td>
                    {formType === "TYPE_1" ? (
                      <td className="px-3 py-3">
                        <Input className="rounded-xl" value={row.specification ?? ""} onChange={(event) => setResultRow(index, { ...row, specification: event.target.value })} disabled={!canEdit} />
                      </td>
                    ) : null}
                    <td className="px-3 py-3">
                      <Input className="rounded-xl" value={row.result ?? ""} onChange={(event) => setResultRow(index, { ...row, result: event.target.value })} disabled={!canEdit} />
                    </td>
                    <td className="px-3 py-3">
                      <Input className="rounded-xl" value={row.methods ?? ""} onChange={(event) => setResultRow(index, { ...row, methods: event.target.value })} disabled={!canEdit} />
                    </td>
                    {canEdit ? (
                      <td className="px-3 py-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label="Hapus baris hasil uji"
                          onClick={() =>
                            setPayload((current) => ({
                              ...current,
                              results:
                                current.results.length > 1
                                  ? current.results.filter((_, rowIndex) => rowIndex !== index)
                                  : current.results,
                            }))
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {canEdit ? (
            <Button type="button" variant="outline" onClick={addResultRow}>
              <Plus className="h-4 w-4" />
              Tambah baris hasil
            </Button>
          ) : null}
        </div>
      </FormSection>

      <FormSection number="5" title="Catatan dan Tanda Tangan">
        <div className="grid gap-4 lg:grid-cols-2">
          <Field label="Catatan" className="lg:col-span-2">
            <Textarea value={payload.notes ?? ""} onChange={(event) => setPayloadField("notes", event.target.value)} disabled={!canEdit} />
          </Field>
          <Field label="Perusahaan">
            <Input value={payload.signer.company ?? ""} onChange={(event) => setSignerField("company", event.target.value)} disabled={!canEdit} required />
          </Field>
          <Field label="Nama penandatangan">
            <Input value={payload.signer.name ?? ""} onChange={(event) => setSignerField("name", event.target.value)} disabled={!canEdit} required />
          </Field>
          <Field label="Jabatan">
            <Input value={payload.signer.title ?? ""} onChange={(event) => setSignerField("title", event.target.value)} disabled={!canEdit} required />
          </Field>
        </div>
      </FormSection>

      {canEdit ? (
        <div className="sticky bottom-4 z-10 flex justify-end border-t border-slate-200 bg-white/85 px-2 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <Button>{submitLabel}</Button>
        </div>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
          Dokumen tidak dapat diubah pada status atau role saat ini.
        </p>
      )}
    </form>
  );
}
