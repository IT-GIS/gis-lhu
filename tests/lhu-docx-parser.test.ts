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

  it("rejects unsupported result table shapes instead of guessing a form type", async () => {
    const documentXml = `<w:document><w:body>
      ${paragraph("No. LP/ J-9999/26")}
      ${paragraph("2.1. Name / Nama : PT Contoh")}
      ${paragraph("3.2. Sample Name / Nama Sampel : Sample Baru")}
      <w:tbl>
        ${row(["PARAMETER", "BATAS", "HASIL"])}
        ${row(["Contoh parameter", "Max 1", "0,5"])}
      </w:tbl>
    </w:body></w:document>`;

    await expect(parseLhuImportFile(await createDocxFile(documentXml))).rejects.toThrow(
      "Tipe form LHU tidak dikenali",
    );
  });
  it("detects ZA table without sampling field as Form Tipe 7 and merges split sampling address label", async () => {
    const documentXml = `<w:document><w:body>
      ${paragraph("No. LP/J-0025D/26")}
      ${paragraph("No. Order/ Nomor Pekerjaan : GIS2603HOF0009")}
      ${paragraph("2.1. Name / Nama : PT Rolimex Kimia Nusamas")}
      ${paragraph("2.2. Address / Alamat : ITC Cempaka Mas Mega Grosir Lt.11")}
      ${paragraph("III. Sampel / Contoh Uji")}
      ${paragraph("3.1. Sample Nomer/ Nomor Contoh : J/FE-0025")}
      ${paragraph("3.2. Sample Name / Nama Contoh : Pupuk Amonium Sulfat (ZA)")}
      ${paragraph("3.3. Packaging / Kemasan : Plastik 1 kg")}
      ${paragraph("3.4. Other Information /Keterangan lain")}
      ${paragraph("3.4.1. Commodity/Komoditi : Fertilizer")}
      ${paragraph("3.4.2. Address of Sampling/ : Quzhou Juhua Polymide Fibre Co., Ltd")}
      ${paragraph("Lokasi Pengambilan Junhua Factory, Kecheng District, Quzhou, Zhejiang 324004")}
      ${paragraph("3.5. Date of Received/Tanggal Terima : 16 Maret 2026")}
      ${paragraph("3.6. Date of Analysis /Tanggal Uji : 16 - 24 Maret 2026")}
      <w:tbl>
        ${row(["NO", "PARAMETER", "UNIT", "RESULT", "METHODS"])}
        ${row(["1", "Kadar nitrogen", "%", "21,43", "SNI 02-1760-2005 Butir 6.1"])}
      </w:tbl>
      ${paragraph("Jakarta, 25 Maret 2026")}
      ${paragraph("PT. Global Inspeksi Sistem")}
      ${paragraph("Dwimas")}
      ${paragraph("Technical Manager")}
    </w:body></w:document>`;

    const parsed = await parseLhuImportFile(await createDocxFile(documentXml));

    expect(parsed.formType).toBe("TYPE_7");
    expect(parsed.payload.sample.sampling).toBe("");
    expect(parsed.payload.sample.additionalInfo).toContainEqual({
      label: "Address of Sampling/Lokasi Pengambilan",
      value: "Quzhou Juhua Polymide Fibre Co., Ltd Junhua Factory, Kecheng District, Quzhou, Zhejiang 324004",
    });
    expect(parsed.payload.results[0]).toMatchObject({
      parameter: "Kadar nitrogen",
      unit: "%",
      result: "21,43",
      methods: "SNI 02-1760-2005 Butir 6.1",
    });
  });
});