import { z } from "zod";

import { formTypeLabels, formTypes, type AppFormType } from "@/lib/domain";
import { type LhuImportContext } from "@/lib/lhu-docx-parser";
import {
  getResultColumns,
  resolveLhuPayload,
  type LhuPayload,
  usesLimitResultTable,
  usesNumberColumn,
  usesSpecificationColumn,
  usesUnitColumn,
} from "@/lib/lhu-payload";

const aiAdditionalInfoSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const aiResultRowSchema = z.object({
  no: z.string(),
  parameter: z.string(),
  unit: z.string(),
  specification: z.string(),
  result: z.string(),
  methods: z.string(),
  limitCfMin: z.string(),
  limitCfMax: z.string(),
  limitSfMin: z.string(),
  limitSfMax: z.string(),
  limitTbMin: z.string(),
  limitTbMax: z.string(),
});

const aiPayloadSchema = z.object({
  reportNo: z.string(),
  orderNo: z.string(),
  receivedDate: z.string(),
  analysisDate: z.string(),
  issue: z.object({
    place: z.string(),
    date: z.string(),
  }),
  principal: z.object({
    name: z.string(),
    address: z.string(),
  }),
  sample: z.object({
    sampleNo: z.string(),
    sampleName: z.string(),
    packaging: z.string(),
    commodity: z.string(),
    type: z.string(),
    sniNo: z.string(),
    additionalInfo: z.array(aiAdditionalInfoSchema),
    sampling: z.string(),
  }),
  results: z.array(aiResultRowSchema),
  resultFooter: z.string(),
  notes: z.string(),
  signer: z.object({
    company: z.string(),
    name: z.string(),
    title: z.string(),
  }),
});

export const lhuAiImportSchema = z.object({
  formType: z.enum(formTypes),
  confidence: z.number().min(0).max(1),
  sourceTableColumns: z.array(z.string()),
  payload: aiPayloadSchema,
  warnings: z.array(z.string()),
});

export type LhuAiImportResult = z.infer<typeof lhuAiImportSchema>;

type ValidatedAiImportResult = {
  formType: AppFormType;
  confidence: number;
  payload: LhuPayload;
  warnings: string[];
};

function compact(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function required(value: string, label: string) {
  if (!compact(value)) {
    throw new Error(`${label} wajib terbaca dari dokumen.`);
  }
}

function normalizeColumn(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function includesColumn(columns: string[], pattern: RegExp) {
  return columns.some((column) => pattern.test(column));
}

export function inferFormTypeFromColumns(sourceTableColumns: string[]): AppFormType | null {
  const columns = sourceTableColumns.map(normalizeColumn).filter(Boolean);
  const hasNo = includesColumn(columns, /^no$/);
  const hasParameter = includesColumn(columns, /^parameter$/);
  const hasUnit = includesColumn(columns, /^unit$/);
  const hasSpecification = includesColumn(columns, /^spe[cs]ification/);
  const hasResult = includesColumn(columns, /^result$/);
  const hasMethods = includesColumn(columns, /^methods?$/);
  const hasLimitCf = includesColumn(columns, /limitcf|cf/);
  const hasLimitSf = includesColumn(columns, /limitsf|sf/);
  const hasLimitTb = includesColumn(columns, /limittb|tb/);

  if (hasNo && hasParameter && hasUnit && hasResult && hasMethods && hasLimitCf && hasLimitSf) {
    return "TYPE_3";
  }

  if (hasNo && hasParameter && hasUnit && hasResult && hasMethods && hasLimitTb) {
    return "TYPE_4";
  }

  if (!hasNo && hasParameter && hasUnit && hasSpecification && hasResult && hasMethods) {
    return "TYPE_5";
  }

  if (!hasNo && hasParameter && !hasUnit && hasSpecification && hasResult && hasMethods) {
    return "TYPE_6";
  }

  if (hasNo && hasParameter && hasUnit && hasSpecification && hasResult && hasMethods) {
    return "TYPE_1";
  }

  if (hasNo && hasParameter && hasUnit && !hasSpecification && hasResult && hasMethods) {
    return "TYPE_2";
  }

  return null;
}

function validateRowForType(row: LhuAiImportResult["payload"]["results"][number], formType: AppFormType, index: number) {
  const rowLabel = `Baris hasil uji ${index + 1}`;

  required(row.parameter, `${rowLabel}: parameter`);
  required(row.result, `${rowLabel}: result`);
  required(row.methods, `${rowLabel}: method/methods`);

  if (usesNumberColumn(formType) && usesLimitResultTable(formType)) {
    required(row.no, `${rowLabel}: no`);
  }

  if (usesUnitColumn(formType)) {
    required(row.unit, `${rowLabel}: unit`);
  }

  if (usesSpecificationColumn(formType)) {
    required(row.specification, `${rowLabel}: specification`);
  }

  if (formType === "TYPE_3") {
    if (!compact(row.limitCfMin) && !compact(row.limitCfMax) && !compact(row.limitSfMin) && !compact(row.limitSfMax)) {
      throw new Error(`${rowLabel}: limit CF/SF wajib terbaca.`);
    }
  }

  if (formType === "TYPE_4") {
    if (!compact(row.limitTbMin) && !compact(row.limitTbMax)) {
      throw new Error(`${rowLabel}: limit TB wajib terbaca.`);
    }
  }
}

export function validateAiImportResult(result: LhuAiImportResult, minConfidence: number): ValidatedAiImportResult {
  if (result.confidence < minConfidence) {
    throw new Error(`Confidence AI ${Math.round(result.confidence * 100)}% masih di bawah batas minimal ${Math.round(minConfidence * 100)}%. Form tidak diisi otomatis.`);
  }

  const inferredFormType = inferFormTypeFromColumns(result.sourceTableColumns);

  if (!inferredFormType) {
    throw new Error("AI membaca dokumen, tetapi struktur tabel tidak sesuai Form Tipe 1 sampai 6. Form tidak diisi otomatis.");
  }

  if (inferredFormType !== result.formType) {
    throw new Error(`AI membaca tabel seperti ${formTypeLabels[inferredFormType]}, tetapi hasil AI memilih ${formTypeLabels[result.formType]}. Form tidak diisi otomatis.`);
  }

  required(result.payload.reportNo, "No. LP");
  required(result.payload.orderNo, "No. Order");
  required(result.payload.issue.place, "Tempat terbit");
  required(result.payload.issue.date, "Tanggal terbit");
  required(result.payload.principal.name, "Nama pelanggan");
  required(result.payload.sample.sampleName, "Nama sampel");

  if (!result.payload.results.length) {
    throw new Error("AI tidak menemukan baris hasil uji. Form tidak diisi otomatis.");
  }

  result.payload.results.forEach((row, index) => validateRowForType(row, result.formType, index));

  return {
    formType: result.formType,
    confidence: result.confidence,
    payload: resolveLhuPayload(result.formType, result.payload),
    warnings: result.warnings,
  };
}

function tablePreview(table: string[][]) {
  if (!table.length) return "Tidak ada tabel Word yang terbaca. Gunakan teks hasil ekstraksi.";

  return table
    .slice(0, 40)
    .map((row, index) => `${index + 1}. ${row.join(" | ")}`)
    .join("\n");
}

export function buildLhuAiImportPrompt(context: LhuImportContext) {
  const text = context.text.slice(0, 18000);

  return [
    "Baca dokumen LHU berikut dan isi JSON sesuai schema.",
    "Aturan penting:",
    "- Jangan mengarang nilai. Jika tidak ada, isi string kosong.",
    "- sourceTableColumns wajib berisi header kolom tabel hasil uji yang terlihat di dokumen.",
    "- Pilih formType hanya jika struktur tabel cocok dengan salah satu tipe berikut.",
    "- TYPE_1: NO, PARAMETER, UNIT, SPECIFICATION, RESULT, METHODS.",
    "- TYPE_2: NO, PARAMETER, UNIT, RESULT, METHODS.",
    "- TYPE_3: NO, PARAMETER, METHOD, UNIT, RESULT, LIMIT (CF) Min/Max, LIMIT (SF) Min/Max.",
    "- TYPE_4: NO, PARAMETER, METHOD, UNIT, RESULT, LIMIT (TB) Min/Max.",
    "- TYPE_5: PARAMETER, UNIT, SPECIFICATION, RESULT, METHODS tanpa NO.",
    "- TYPE_6: PARAMETER, SPECIFICATION, RESULT, METHODS tanpa NO dan tanpa UNIT.",
    "- Jika struktur tabel tidak cocok, tetap pilih tipe terdekat hanya bila benar-benar sama. Turunkan confidence dan tulis warning.",
    "- Untuk field resultFooter, masukkan catatan footer tabel seperti tanda akreditasi, under limit, atau kesimpulan jika ada.",
    "- Untuk notes, masukkan catatan umum laporan jika ada.",
    "",
    `Kolom sistem yang diharapkan per tipe: ${JSON.stringify(Object.fromEntries(formTypes.map((type) => [type, getResultColumns(type)])))}`,
    "",
    "TABEL TERBACA:",
    tablePreview(context.table),
    "",
    "TEKS DOKUMEN:",
    text,
  ].join("\n");
}
