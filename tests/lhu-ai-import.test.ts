import { describe, expect, it } from "vitest";

import { inferFormTypeFromColumns, validateAiImportResult, type LhuAiImportResult } from "@/lib/lhu-ai-import";

function baseAiResult(overrides: Partial<LhuAiImportResult> = {}): LhuAiImportResult {
  return {
    formType: "TYPE_6",
    confidence: 0.92,
    sourceTableColumns: ["PARAMETER", "SPECIFICATION", "RESULT", "METHODS"],
    payload: {
      reportNo: "LP/ J-0016F/26",
      orderNo: "GIS2605SDA0009",
      receivedDate: "18 MEI 2026",
      analysisDate: "18 MEI - 10 JUNI 2026",
      issue: {
        place: "Sidoarjo",
        date: "11 Juni 2026",
      },
      principal: {
        name: "PT. Sardana Nusantara Indonesia",
        address: "Riau",
      },
      sample: {
        sampleNo: "J/MG-0016",
        sampleName: "Minyak Goreng Sawit",
        packaging: "Plastik 1000 ml",
        commodity: "",
        type: "",
        sniNo: "",
        additionalInfo: [{ label: "Merk", value: "SARDANA" }],
        sampling: "-",
      },
      results: [
        {
          no: "",
          parameter: "Bilangan peroksida",
          unit: "",
          specification: "Max 10",
          result: "5,85",
          methods: "SNI 7709:2019, Lamp A.6",
          limitCfMin: "",
          limitCfMax: "",
          limitSfMin: "",
          limitSfMax: "",
          limitTbMin: "",
          limitTbMax: "",
        },
      ],
      resultFooter: "",
      notes: "Catatan uji",
      signer: {
        company: "PT. Global Inspeksi Sistem",
        name: "Dwimas",
        title: "Technical Manager",
      },
    },
    warnings: [],
    ...overrides,
  };
}

describe("LHU AI import guard", () => {
  it("accepts a valid Form Tipe 6 AI mapping", () => {
    const validated = validateAiImportResult(baseAiResult(), 0.8);

    expect(validated.formType).toBe("TYPE_6");
    expect(validated.payload.results[0]?.specification).toBe("Max 10");
  });

  it("rejects unsupported table columns", () => {
    expect(inferFormTypeFromColumns(["PARAMETER", "BATAS", "HASIL"])).toBeNull();
    expect(() =>
      validateAiImportResult(
        baseAiResult({
          sourceTableColumns: ["PARAMETER", "BATAS", "HASIL"],
        }),
        0.8,
      ),
    ).toThrow("struktur tabel tidak sesuai");
  });
});
