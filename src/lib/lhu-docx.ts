import { readFile } from "fs/promises";
import path from "path";

import JSZip from "jszip";

import type { AppFormType } from "@/lib/domain";
import { getResultColumns, type LhuPayload, usesLimitResultTable, usesSamplingField } from "@/lib/lhu-payload";

const templatePath = path.join(process.cwd(), "public", "templates", "template-gis-lhu.docx");

function escapeXml(value?: string | null) {
  return (value?.trim() || "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function text(value?: string | null) {
  return escapeXml(value);
}

function run(value: string, { bold = false, size = 18 }: { bold?: boolean; size?: number } = {}) {
  const props = `<w:rPr>${bold ? "<w:b/>" : ""}<w:sz w:val="${size}"/></w:rPr>`;
  return `<w:r>${props}<w:t xml:space="preserve">${value}</w:t></w:r>`;
}

function paragraph(
  value: string,
  {
    bold = false,
    center = false,
    right = false,
    size = 18,
    after = 80,
    before = 0,
  }: {
    bold?: boolean;
    center?: boolean;
    right?: boolean;
    size?: number;
    after?: number;
    before?: number;
  } = {},
) {
  const alignment = center ? '<w:jc w:val="center"/>' : right ? '<w:jc w:val="right"/>' : "";

  return `<w:p><w:pPr>${alignment}<w:spacing w:before="${before}" w:after="${after}"/></w:pPr>${run(escapeXml(value), { bold, size })}</w:p>`;
}

function line(label: string, value?: string | null, indent = 0) {
  return `<w:p><w:pPr><w:tabs><w:tab w:val="left" w:pos="4050"/></w:tabs><w:ind w:left="${indent}"/><w:spacing w:after="20"/></w:pPr>${run(escapeXml(label), { size: 18 })}${run("\t: ", { size: 18 })}${run(text(value), { size: 18 })}</w:p>`;
}

function sectionTitle(value: string) {
  return paragraph(value, { bold: true, size: 20, before: 120, after: 60 });
}

function tableCell(value: string, { bold = false, center = false }: { bold?: boolean; center?: boolean } = {}) {
  const align = center ? '<w:jc w:val="center"/>' : "";

  return `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/><w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:pPr>${align}<w:spacing w:after="0"/></w:pPr>${run(escapeXml(value), { bold, size: 16 })}</w:p></w:tc>`;
}

function tableRow(cells: string[], { header = false, centerIndexes = [] }: { header?: boolean; centerIndexes?: number[] } = {}) {
  return `<w:tr>${cells
    .map((cell, index) => tableCell(cell, { bold: header, center: header || centerIndexes.includes(index) }))
    .join("")}</w:tr>`;
}

function mergedTableRow(value: string, columnCount: number) {
  const paragraphs = value
    .split(/\r?\n/)
    .map((line) => paragraph(line, { size: 16, after: 0 }))
    .join("");

  return `<w:tr><w:tc><w:tcPr><w:gridSpan w:val="${columnCount}"/><w:tcW w:w="0" w:type="auto"/><w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tcMar></w:tcPr>${paragraphs}</w:tc></w:tr>`;
}

function resultTable(formType: AppFormType, payload: LhuPayload) {
  const columns = getResultColumns(formType);
  const rows = payload.results.map((row, index) => {
    const values =
      formType === "TYPE_3"
        ? [
            row.no || String(index + 1),
            row.parameter || "-",
            row.methods || "-",
            row.unit || "-",
            row.result || "-",
            row.limitCfMin || "-",
            row.limitCfMax || "-",
            row.limitSfMin || "-",
            row.limitSfMax || "-",
          ]
        : formType === "TYPE_4"
        ? [
            row.no || String(index + 1),
            row.parameter || "-",
            row.methods || "-",
            row.unit || "-",
            row.result || "-",
            row.limitTbMin || "-",
            row.limitTbMax || "-",
          ]
        : formType === "TYPE_5"
        ? [
            row.parameter || "-",
            row.unit || "-",
            row.specification || "-",
            row.result || "-",
            row.methods || "-",
          ]
        : formType === "TYPE_6"
        ? [
            row.parameter || "-",
            row.specification || "-",
            row.result || "-",
            row.methods || "-",
          ]
        : formType === "TYPE_1"
        ? [
            String(index + 1),
            row.parameter || "-",
            row.unit || "-",
            row.specification || "-",
            row.result || "-",
            row.methods || "-",
          ]
        : [
            String(index + 1),
            row.parameter || "-",
            row.unit || "-",
            row.result || "-",
            row.methods || "-",
          ];

    return tableRow(values, {
      centerIndexes:
        formType === "TYPE_3"
          ? [0, 3, 4, 5, 6, 7, 8]
          : formType === "TYPE_4"
            ? [0, 3, 4, 5, 6]
            : formType === "TYPE_5"
              ? [1, 2, 3]
            : formType === "TYPE_6"
              ? [1, 2]
            : formType === "TYPE_1"
              ? [0, 2, 3, 4]
              : [0, 2, 3],
    });
  });

  const headers =
    formType === "TYPE_3"
      ? `${tableRow(["No", "Parameter", "Method", "Unit", "Result", "Limit (CF)", "Limit (SF)"], { header: true })}${tableRow(["", "", "", "", "", "Min", "Max", "Min", "Max"], { header: true })}`
      : formType === "TYPE_4"
        ? `${tableRow(["No", "Parameter", "Method", "Unit", "Result", "Limit (TB)"], { header: true })}${tableRow(["", "", "", "", "", "Min", "Max"], { header: true })}`
      : tableRow(columns, { header: true });

  const footer = payload.resultFooter ? mergedTableRow(payload.resultFooter, columns.length) : "";

  return `<w:tbl><w:tblPr><w:tblW w:w="10000" w:type="pct"/><w:tblBorders><w:top w:val="single" w:sz="6" w:space="0" w:color="000000"/><w:left w:val="single" w:sz="6" w:space="0" w:color="000000"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/><w:right w:val="single" w:sz="6" w:space="0" w:color="000000"/><w:insideH w:val="single" w:sz="6" w:space="0" w:color="000000"/><w:insideV w:val="single" w:sz="6" w:space="0" w:color="000000"/></w:tblBorders><w:tblLook w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>${headers}${rows.join("")}${footer}</w:tbl>`;
}

function buildBodyContent({
  formType,
  payload,
  documentNumber,
}: {
  formType: AppFormType;
  payload: LhuPayload;
  documentNumber: string;
}) {
  const additionalInfo = payload.sample.additionalInfo
    .map((item, index) => line(`3.4.${index + 1}. ${item.label || "Informasi"}`, item.value, 420))
    .join("");

  return [
    paragraph("REPORT OF ANALYSIS", { bold: true, center: true, size: 24, after: 0 }),
    paragraph("Laporan Hasil Pengujian", { bold: true, center: true, size: 18, after: 0 }),
    paragraph(`No. ${payload.reportNo || documentNumber}`, { bold: true, center: true, size: 18, after: 160 }),
    paragraph(`No. Order/ Nomor Pekerjaan: ${payload.orderNo || "-"}`, { bold: true, size: 18, after: 140 }),
    sectionTitle("II.Principal / Pelanggan"),
    line("2.1. Name / Nama", payload.principal.name),
    line("2.2. Address / Alamat", payload.principal.address),
    sectionTitle("III. Sampel / Contoh Uji"),
    line("3.1. Sample Nomer/ Nomor Contoh", payload.sample.sampleNo),
    line("3.2. Sample Name / Nama Contoh", payload.sample.sampleName),
    line("3.3. Packaging / Kemasan", payload.sample.packaging),
    paragraph("3.4. Other Information / Keterangan lain", { bold: true, size: 18, after: 20 }),
    additionalInfo,
    line("3.5. Date of Received/Tanggal Terima", payload.receivedDate),
    line("3.6. Date of Analysis /Tanggal Uji", payload.analysisDate),
    usesLimitResultTable(formType) ? line("3.7. Number of SNI /Nomor SNI", payload.sample.sniNo) : "",
    usesSamplingField(formType) ? line("3.7. Sampling/Pengambilan Sample", payload.sample.sampling) : "",
    sectionTitle("IV. Result / Hasil Uji:"),
    resultTable(formType, payload),
    paragraph(`Catatan : ${payload.notes || "-"}`, { size: 16, after: 160 }),
    paragraph(`${payload.issue.place || "Jakarta"}, ${payload.issue.date || "-"}`, { right: true, size: 18, after: 40 }),
    paragraph(payload.signer.company || "PT. Global Inspeksi Sistem", { right: true, size: 18, after: 900 }),
    paragraph(payload.signer.name || "Wina", { bold: true, right: true, size: 18, after: 0 }),
    paragraph(payload.signer.title || "Technical Manager", { right: true, size: 18, after: 0 }),
  ].join("");
}

function replaceDocumentBody(documentXml: string, contentXml: string) {
  const sectMatch = documentXml.match(/<w:sectPr[\s\S]*?<\/w:sectPr>/);

  if (!sectMatch) {
    throw new Error("Template DOCX tidak memiliki section properties.");
  }

  return documentXml.replace(/<w:body>[\s\S]*?<\/w:body>/, `<w:body>${contentXml}${sectMatch[0]}</w:body>`);
}

export async function buildLhuDocxBuffer({
  formType,
  payload,
  documentNumber,
}: {
  formType: AppFormType;
  payload: LhuPayload;
  documentNumber: string;
}) {
  const template = await readFile(templatePath);
  const zip = await JSZip.loadAsync(template);
  const documentFile = zip.file("word/document.xml");

  if (!documentFile) {
    throw new Error("Template DOCX tidak memiliki word/document.xml.");
  }

  const documentXml = await documentFile.async("text");
  const contentXml = buildBodyContent({ formType, payload, documentNumber });
  zip.file("word/document.xml", replaceDocumentBody(documentXml, contentXml));

  return zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
}
