import JSZip from "jszip";
import { describe, expect, it } from "vitest";

import { parseLhuImportFile } from "@/lib/lhu-docx-parser";

function paragraph(value: string) {
  return `<w:p><w:r><w:t>${value}</w:t></w:r></w:p>`;
}

function cell(value: string) {
  return `<w:tc>${paragraph(value)}</w:tc>`;
}

function row(values: string[]) {
  return `<w:tr>${values.map(cell).join("")}</w:tr>`;
}

async function createDocxFile(documentXml: string) {
  const zip = new JSZip();
  zip.file("word/document.xml", documentXml);
  const buffer = await zip.generateAsync({ type: "nodebuffer" });

  return new File([buffer], "mgs.docx", {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

describe("LHU DOCX parser", () => {
  it("detects minyak goreng 4-column result table as Form Tipe 6", async () => {
    const documentXml = `<w:document><w:body>
      ${paragraph("No. LP/ J-0016F/26")}
      ${paragraph("No. Order/ Nomor Pekerjaan : GIS2605SDA0009")}
      ${paragraph("2.1. Name / Nama : PT. Sardana Nusantara Indonesia")}
      ${paragraph("2.2. Address / Alamat : Riau")}
      ${paragraph("3.1. Sample Number/ Nomor Sampel : J/MG-0016")}
      ${paragraph("3.2. Sample Name / Nama Sampel : Minyak Goreng Sawit")}
      ${paragraph("3.3. Packaging / Kemasan : Plastik 1000 ml")}
      ${paragraph("3.5. Date of Received/Tanggal Terima : 18 MEI 2026")}
      ${paragraph("3.6. Date of Analysis /Tanggal Uji : 18 MEI - 10 JUNI 2026")}
      ${paragraph("3.7. Sampling/Pengambilan Sample : -")}
      <w:tbl>
        ${row(["PARAMETER", "SPECIFICATION", "RESULT", "METHODS"])}
        ${row(["Bilangan peroksida", "Max 10", "5,85", "SNI 7709:2019, Lamp A.6"])}
      </w:tbl>
    </w:body></w:document>`;

    const parsed = await parseLhuImportFile(await createDocxFile(documentXml));

    expect(parsed.formType).toBe("TYPE_6");
    expect(parsed.payload.sample.sampleName).toBe("Minyak Goreng Sawit");
    expect(parsed.payload.results[0]).toMatchObject({
      parameter: "Bilangan peroksida",
      unit: "",
      specification: "Max 10",
      result: "5,85",
      methods: "SNI 7709:2019, Lamp A.6",
    });
  });
});
