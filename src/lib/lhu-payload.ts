import { z } from "zod";

import type { AppFormType } from "@/lib/domain";
import { formTypes } from "@/lib/domain";

const defaultNotes =
  "*This report refers to tested sample only cannot be reproduced in any way except in full context and with the prior approval in writing";

const jsonStringSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    if (!value) return [];

    try {
      return JSON.parse(value) as unknown;
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Data tabel LHU tidak valid.",
      });
      return z.NEVER;
    }
  });

const additionalInfoSchema = z.object({
  label: z.string().trim().max(100).optional().or(z.literal("")),
  value: z.string().trim().max(500).optional().or(z.literal("")),
});

const resultRowSchema = z.object({
  parameter: z.string().trim().max(200).optional().or(z.literal("")),
  unit: z.string().trim().max(50).optional().or(z.literal("")),
  specification: z.string().trim().max(200).optional().or(z.literal("")),
  result: z.string().trim().max(200).optional().or(z.literal("")),
  methods: z.string().trim().max(500).optional().or(z.literal("")),
});

const basePayloadSchema = z.object({
  reportNo: z.string().trim().min(1, "Nomor laporan wajib diisi.").max(100),
  orderNo: z.string().trim().max(100).optional().or(z.literal("")),
  receivedDate: z.string().trim().max(100).optional().or(z.literal("")),
  analysisDate: z.string().trim().max(100).optional().or(z.literal("")),
  issue: z.object({
    place: z.string().trim().min(1, "Tempat terbit wajib diisi.").max(100),
    date: z.string().trim().min(1, "Tanggal terbit wajib diisi.").max(100),
  }),
  principal: z.object({
    name: z.string().trim().min(1, "Nama pelanggan wajib diisi.").max(200),
    address: z.string().trim().max(2000).optional().or(z.literal("")),
  }),
  sample: z.object({
    sampleNo: z.string().trim().max(100).optional().or(z.literal("")),
    sampleName: z.string().trim().min(1, "Nama contoh wajib diisi.").max(200),
    packaging: z.string().trim().max(200).optional().or(z.literal("")),
    commodity: z.string().trim().max(200).optional().or(z.literal("")),
    type: z.string().trim().max(200).optional().or(z.literal("")),
    additionalInfo: z.array(additionalInfoSchema).default([]),
    sampling: z.string().trim().max(500).optional().or(z.literal("")),
  }),
  results: z.array(resultRowSchema),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
  signer: z.object({
    company: z.string().trim().max(200).optional().or(z.literal("")),
    name: z.string().trim().max(100).optional().or(z.literal("")),
    title: z.string().trim().max(100).optional().or(z.literal("")),
  }),
});

export type LhuAdditionalInfo = z.infer<typeof additionalInfoSchema>;
export type LhuResultRow = z.infer<typeof resultRowSchema>;
export type LhuPayload = z.infer<typeof basePayloadSchema>;

export function createEmptyLhuPayload(formType: AppFormType): LhuPayload {
  return {
    reportNo: "",
    orderNo: "",
    receivedDate: "",
    analysisDate: "",
    issue: {
      place: "Jakarta",
      date: "",
    },
    principal: {
      name: "",
      address: "",
    },
    sample: {
      sampleNo: "",
      sampleName: "",
      packaging: "",
      commodity: "",
      type: "",
      additionalInfo:
        formType === "TYPE_1"
          ? [
              { label: "Brand/ Merek", value: "" },
              { label: "Address of Sampling/ Lokasi Pengambilan", value: "" },
              { label: "Parameter", value: "" },
              { label: "No BAPC", value: "" },
            ]
          : [
              { label: "Vessel/ Kapal", value: "" },
              { label: "BL", value: "" },
              { label: "Gudang", value: "" },
            ],
      sampling: formType === "TYPE_2" ? "-" : "",
    },
    results: [
      {
        parameter: "",
        unit: "",
        specification: formType === "TYPE_1" ? "" : undefined,
        result: "",
        methods: "",
      },
    ],
    notes: defaultNotes,
    signer: {
      company: "PT. Global Inspeksi Sistem",
      name: "Wina",
      title: "Technical Manager",
    },
  };
}

function compactAdditionalInfo(items: LhuAdditionalInfo[]) {
  return items.filter((item) => item.label?.trim() || item.value?.trim());
}

function compactResults(rows: LhuResultRow[]) {
  return rows.filter(
    (row) =>
      row.parameter?.trim() ||
      row.unit?.trim() ||
      row.specification?.trim() ||
      row.result?.trim() ||
      row.methods?.trim(),
  );
}

function parseJsonArray<T>(value: unknown, fallback: T[]) {
  const parsed = jsonStringSchema.safeParse(typeof value === "string" ? value : "");
  return parsed.success && Array.isArray(parsed.data) ? (parsed.data as T[]) : fallback;
}

function normalizePayload(formType: AppFormType, payload: LhuPayload): LhuPayload {
  const results = payload.results.map((row) => ({
    parameter: row.parameter ?? "",
    unit: row.unit ?? "",
    specification: formType === "TYPE_1" ? row.specification ?? "" : "",
    result: row.result ?? "",
    methods: row.methods ?? "",
  }));

  return {
    ...payload,
    sample: {
      ...payload.sample,
      sampling: payload.sample.sampling ?? "",
      additionalInfo: compactAdditionalInfo(payload.sample.additionalInfo).map((item) => ({
        label: item.label ?? "",
        value: item.value ?? "",
      })),
    },
    results: compactResults(results),
    notes: payload.notes || defaultNotes,
    signer: {
      company: payload.signer.company || "PT. Global Inspeksi Sistem",
      name: payload.signer.name || "Wina",
      title: payload.signer.title || "Technical Manager",
    },
  };
}

export function parseLhuDocumentInput(input: Record<string, string>) {
  const formType = z.enum(formTypes).parse(input.formType);
  const additionalInfo = parseJsonArray<LhuAdditionalInfo>(input.additionalInfoJson, []);
  const results = parseJsonArray<LhuResultRow>(input.resultsJson, []);

  const payloadCandidate: LhuPayload = {
    reportNo: input.reportNo ?? "",
    orderNo: input.orderNo ?? "",
    receivedDate: input.receivedDate ?? "",
    analysisDate: input.analysisDate ?? "",
    issue: {
      place: input.issuePlace ?? "Jakarta",
      date: input.issueDate ?? "",
    },
    principal: {
      name: input.principalName ?? "",
      address: input.principalAddress ?? "",
    },
    sample: {
      sampleNo: input.sampleNo ?? "",
      sampleName: input.sampleName ?? "",
      packaging: input.packaging ?? "",
      commodity: input.commodity ?? "",
      type: input.sampleType ?? "",
      sampling: input.sampling ?? "",
      additionalInfo,
    },
    results,
    notes: input.notes ?? "",
    signer: {
      company: input.signerCompany ?? "PT. Global Inspeksi Sistem",
      name: input.signerName ?? "Wina",
      title: input.signerTitle ?? "Technical Manager",
    },
  };

  const payload = normalizePayload(formType, basePayloadSchema.parse(payloadCandidate));

  if (!payload.results.length) {
    throw new Error("Minimal satu baris hasil uji wajib diisi.");
  }

  payload.results.forEach((row, index) => {
    if (!row.parameter?.trim()) {
      throw new Error(`Parameter wajib diisi pada baris hasil uji ${index + 1}.`);
    }

    if (!row.result?.trim()) {
      throw new Error(`Result wajib diisi pada baris hasil uji ${index + 1}.`);
    }

    if (!row.methods?.trim()) {
      throw new Error(`Methods wajib diisi pada baris hasil uji ${index + 1}.`);
    }
  });

  if (formType === "TYPE_1") {
    payload.results.forEach((row, index) => {
      if (!row.specification?.trim()) {
        throw new Error(`Specification wajib diisi pada baris hasil uji ${index + 1}.`);
      }
    });
  }

  return {
    title: payload.principal.name,
    formType,
    referenceNo: payload.orderNo,
    clientName: payload.principal.name,
    sampleName: payload.sample.sampleName,
    notes: payload.notes,
    assignedToId: input.assignedToId ?? "",
    formPayload: payload,
  };
}

export function resolveLhuPayload(formType: AppFormType, value: unknown): LhuPayload {
  const empty = createEmptyLhuPayload(formType);
  const parsed = basePayloadSchema.safeParse(value);

  if (!parsed.success) {
    return empty;
  }

  return normalizePayload(formType, parsed.data);
}

export function getResultColumns(formType: AppFormType) {
  return formType === "TYPE_1"
    ? ["NO", "PARAMETER", "UNIT", "SPECIFICATION", "RESULT", "METHODS"]
    : ["NO", "PARAMETER", "UNIT", "RESULT", "METHODS"];
}
