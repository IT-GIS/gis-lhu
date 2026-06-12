import { describe, expect, it } from "vitest";

import { parseLhuDocumentInput } from "@/lib/lhu-payload";

function baseInput(overrides: Record<string, string> = {}) {
  return {
    formType: "TYPE_1",
    reportNo: "LP/J-0024D/26",
    orderNo: "GIS2602HOF0025",
    receivedDate: "27 Februari 2026",
    analysisDate: "27 Februari - 09 Maret 2026",
    issuePlace: "Jakarta",
    issueDate: "10 Maret 2026",
    principalName: "PT Rolimex Kimia Nusamas",
    principalAddress: "Jakarta",
    sampleNo: "J/FE-0024",
    sampleName: "Fosfat Alam Untuk Pertanian",
    packaging: "Plastik 2 kg",
    commodity: "Fertilizer",
    sampleType: "Rock Phosphate",
    additionalInfoJson: JSON.stringify([{ label: "Brand/ Merek", value: "EKOFOS" }]),
    resultsJson: JSON.stringify([
      {
        parameter: "Total P2O5",
        unit: "%",
        specification: "min. 28",
        result: "28,21",
        methods: "AOAC 957.02:2023 dan AOAC 958.01:2023",
      },
    ]),
    resultFooter: '*Tidak Termasuk Ruang Lingkup Akreditasi\n"<" Under Limit Of Quantification',
    notes: "Catatan uji",
    signerCompany: "PT. Global Inspeksi Sistem",
    signerName: "Wina",
    signerTitle: "Technical Manager",
    assignedToId: "",
    ...overrides,
  };
}

describe("LHU payload parser", () => {
  it("requires specification for Form Tipe 1 result rows", () => {
    expect(() =>
      parseLhuDocumentInput(
        baseInput({
          resultsJson: JSON.stringify([
            {
              parameter: "Total P2O5",
              unit: "%",
              specification: "",
              result: "28,21",
              methods: "AOAC 957.02:2023",
            },
          ]),
        }),
      ),
    ).toThrow("Specification wajib diisi");
  });

  it("accepts Form Tipe 2 result rows without specification", () => {
    const parsed = parseLhuDocumentInput(
      baseInput({
        formType: "TYPE_2",
        reportNo: "LP/J-0108D/25",
        principalName: "PT. Permata Agro Persada",
        sampleName: "ZA IN BAG @50 KG",
        sampleType: "AMONIUM SULFAT",
        resultsJson: JSON.stringify([
          {
            parameter: "Kadar nitrogen",
            unit: "%",
            result: "21,58",
            methods: "SNI 02-1760-2005 Butir 6.1",
          },
        ]),
      }),
    );

    expect(parsed.formPayload.results[0]?.specification).toBe("");
    expect(parsed.formPayload.resultFooter).toContain("Under Limit Of Quantification");
    expect(parsed.clientName).toBe("PT. Permata Agro Persada");
    expect(parsed.title).toBe("PT. Permata Agro Persada");
  });

  it("keeps Wina and Technical Manager as editable defaults", () => {
    const parsed = parseLhuDocumentInput(
      baseInput({
        signerName: "",
        signerTitle: "",
      }),
    );

    expect(parsed.formPayload.signer.name).toBe("Wina");
    expect(parsed.formPayload.signer.title).toBe("Technical Manager");
  });

  it("rejects empty payloads with a clear message", () => {
    expect(() =>
      parseLhuDocumentInput(
        baseInput({
          reportNo: "",
          principalName: "",
          sampleName: "",
          resultsJson: "[]",
        }),
      ),
    ).toThrow();
  });
});
