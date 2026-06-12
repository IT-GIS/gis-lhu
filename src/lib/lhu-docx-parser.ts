import JSZip from "jszip";

import type { AppFormType } from "@/lib/domain";
import { createEmptyLhuPayload, type LhuPayload, type LhuResultRow } from "@/lib/lhu-payload";

type ParsedDocx = {
  formType: AppFormType;
  title: string;
  payload: LhuPayload;
};

const pdfTextDecoder = new TextDecoder("latin1");

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function decodeXmlText(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function extractWordText(fragment: string) {
  return normalizeText(
    decodeXmlText(
      fragment
        .replace(/<w:tab\b[^>]*\/>/g, "\t")
        .replace(/<w:br\b[^>]*\/>/g, "\n")
        .replace(/<[^>]+>/g, ""),
    ),
  );
}

function extractWordParagraphs(documentText: string) {
  return Array.from(documentText.matchAll(/<w:p\b[\s\S]*?<\/w:p>/g))
    .map((paragraph) => extractWordText(paragraph[0]))
    .filter(Boolean);
}

function extractWordTables(documentText: string) {
  return Array.from(documentText.matchAll(/<w:tbl\b[\s\S]*?<\/w:tbl>/g)).map((table) =>
    Array.from(table[0].matchAll(/<w:tr\b[\s\S]*?<\/w:tr>/g)).map((row) =>
      Array.from(row[0].matchAll(/<w:tc\b[\s\S]*?<\/w:tc>/g)).map((cell) => extractWordText(cell[0])),
    ),
  );
}

function extractAfterColon(line?: string) {
  if (!line) return "";
  const colonIndex = line.indexOf(":");
  return colonIndex >= 0 ? normalizeText(line.slice(colonIndex + 1)) : "";
}

function findLine(lines: string[], pattern: RegExp) {
  return lines.find((line) => pattern.test(line));
}

function findIndex(lines: string[], pattern: RegExp) {
  return lines.findIndex((line) => pattern.test(line));
}

function collectContinuation(lines: string[], startIndex: number, stopPattern: RegExp) {
  if (startIndex < 0) return "";

  const values: string[] = [extractAfterColon(lines[startIndex])];

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];

    if (stopPattern.test(line)) break;
    values.push(line);
  }

  return normalizeText(values.join(" "));
}

function cleanAdditionalInfoValue(value: string) {
  return normalizeText(value.replace(/\bLokasi Pengambilan\s*/i, ""));
}

function extractInlineLabelValue(lines: string[], pattern: RegExp) {
  return extractAfterColon(findLine(lines, pattern));
}

function extractLooseValue(lines: string[], pattern: RegExp, stopPattern: RegExp) {
  const index = findIndex(lines, pattern);
  if (index < 0) return "";

  const inlineValue = extractAfterColon(lines[index]);
  if (inlineValue) return inlineValue;

  const nextLine = lines[index + 1];
  if (nextLine && !stopPattern.test(nextLine)) {
    return normalizeText(nextLine);
  }

  return collectContinuation(lines, index, stopPattern);
}

function extractReportNo(lines: string[]) {
  const line = findLine(lines, /(?:^|\b)No\.\s*LP/i);
  if (!line) return "";

  const colonValue = extractAfterColon(line);
  if (colonValue) return colonValue;

  const inlineMatch = line.match(/No\.\s*(LP\s*\/?\s*[-A-Z0-9/ ]+)/i);
  if (inlineMatch?.[1]) return normalizeText(inlineMatch[1]);

  return normalizeText(line.replace(/^.*?No\.\s*/i, ""));
}

function extractNumberedValue(lines: string[], pattern: RegExp, stopPattern = /^\d+\.\d+\.|^[IVX]+\./) {
  const index = findIndex(lines, pattern);
  return collectContinuation(lines, index, stopPattern);
}

function extractIssue(lines: string[]) {
  const issueIndex = findIndex(lines, /[A-Za-z .]+,\s+\d{1,2}\s+\S+\s+\d{4}/i);

  if (issueIndex < 0) {
    return {
      issue: {
        place: "Jakarta",
        date: "",
      },
      signer: {
        company: "PT. Global Inspeksi Sistem",
        name: "Wina",
        title: "Technical Manager",
      },
    };
  }

  const line = lines[issueIndex]?.match(/[A-Za-z .]+,\s+\d{1,2}\s+\S+\s+\d{4}/i)?.[0] ?? "";
  const [place = "Jakarta", ...dateParts] = line.split(",");
  const company = lines[issueIndex + 1]?.includes("Global Inspeksi") ? lines[issueIndex + 1] : "PT. Global Inspeksi Sistem";
  const signerName = lines[issueIndex + 2] && !/^Page\b/i.test(lines[issueIndex + 2]) ? lines[issueIndex + 2] : "Wina";
  const signerTitle = lines[issueIndex + 3] && !/^Page\b/i.test(lines[issueIndex + 3]) ? lines[issueIndex + 3] : "Technical Manager";

  return {
    issue: {
      place: normalizeText(place) || "Jakarta",
      date: normalizeText(dateParts.join(",")),
    },
    signer: {
      company,
      name: signerName,
      title: signerTitle,
    },
  };
}

function parseResults(rows: string[][], formType: AppFormType) {
  const results: LhuResultRow[] = [];
  let notes = "";
  const header = rows[0] ?? [];
  const parameterIndex = header.findIndex((cell) => /^PARAMETER$/i.test(cell));
  const unitIndex = header.findIndex((cell) => /^UNIT$/i.test(cell));
  const specificationIndex = header.findIndex((cell) => /^SPECIFICATION$/i.test(cell));
  const resultIndex = header.findIndex((cell) => /^RESULT$/i.test(cell));
  const methodsIndex = header.findIndex((cell) => /^METHODS?$/i.test(cell));

  rows.slice(1).forEach((cells) => {
    const firstCell = cells[0] ?? "";

    if (/^\d+$/.test(firstCell)) {
      if (formType === "TYPE_3" || formType === "TYPE_4") {
        results.push({
          no: firstCell,
          parameter: cells[1] ?? "",
          methods: cells[2] ?? "",
          unit: cells[3] ?? "",
          result: cells[4] ?? "",
          limitCfMin: formType === "TYPE_3" ? cells[5] ?? "" : "",
          limitCfMax: formType === "TYPE_3" ? cells[6] ?? "" : "",
          limitSfMin: formType === "TYPE_3" ? cells[7] ?? "" : "",
          limitSfMax: formType === "TYPE_3" ? cells[8] ?? "" : "",
          limitTbMin: formType === "TYPE_4" ? cells[5] ?? "" : "",
          limitTbMax: formType === "TYPE_4" ? cells[6] ?? "" : "",
        });
        return;
      }

      if (formType === "TYPE_1") {
        results.push({
          parameter: cells[1] ?? "",
          unit: cells[2] ?? "",
          specification: cells[3] ?? "",
          result: cells[4] ?? "",
          methods: cells[5] ?? "",
        });
      } else {
        results.push({
          parameter: cells[1] ?? "",
          unit: cells[2] ?? "",
          specification: "",
          result: cells[3] ?? "",
          methods: cells[4] ?? "",
        });
      }
      return;
    }

    if (
      formType === "TYPE_1" &&
      parameterIndex >= 0 &&
      unitIndex >= 0 &&
      specificationIndex >= 0 &&
      resultIndex >= 0 &&
      methodsIndex >= 0 &&
      cells[parameterIndex]
    ) {
      results.push({
        parameter: cells[parameterIndex] ?? "",
        unit: cells[unitIndex] ?? "",
        specification: cells[specificationIndex] ?? "",
        result: cells[resultIndex] ?? "",
        methods: cells[methodsIndex] ?? "",
      });
      return;
    }

    if (
      formType === "TYPE_2" &&
      parameterIndex >= 0 &&
      unitIndex >= 0 &&
      resultIndex >= 0 &&
      methodsIndex >= 0 &&
      cells[parameterIndex]
    ) {
      results.push({
        parameter: cells[parameterIndex] ?? "",
        unit: cells[unitIndex] ?? "",
        specification: "",
        result: cells[resultIndex] ?? "",
        methods: cells[methodsIndex] ?? "",
      });
      return;
    }

    if ((formType === "TYPE_3" || formType === "TYPE_4") && cells[1]) {
      results.push({
        no: "",
        parameter: cells[1] ?? "",
        methods: cells[2] ?? "",
        unit: cells[3] ?? "",
        result: cells[4] ?? "",
        limitCfMin: formType === "TYPE_3" ? cells[5] ?? "" : "",
        limitCfMax: formType === "TYPE_3" ? cells[6] ?? "" : "",
        limitSfMin: formType === "TYPE_3" ? cells[7] ?? "" : "",
        limitSfMax: formType === "TYPE_3" ? cells[8] ?? "" : "",
        limitTbMin: formType === "TYPE_4" ? cells[5] ?? "" : "",
        limitTbMax: formType === "TYPE_4" ? cells[6] ?? "" : "",
      });
      return;
    }

    const noteText = cells.join(" ");
    if (/catatan/i.test(noteText)) {
      notes = noteText.replace(/^Catatan\s*:?\s*/i, "");
    }
  });

  return { results, notes };
}

function isResultTableStopLine(line: string) {
  return (
    /^Catatan\b/i.test(line) ||
    /^Notes?\b/i.test(line) ||
    /^\*?This report\b/i.test(line) ||
    /[A-Za-z .]+,\s+\d{1,2}\s+\S+\s+\d{4}/i.test(line) ||
    /^PT\.?\s+Global\s+Inspeksi\s+Sistem/i.test(line) ||
    /^Technical\s+Manager/i.test(line) ||
    /^Page\b/i.test(line)
  );
}

function parsePdfInlineResultRow(line: string, formType: AppFormType) {
  const cells = line.split(/\s{2,}|\t+/).map(normalizeText).filter(Boolean);
  const expectedCells = formType === "TYPE_1" ? 6 : formType === "TYPE_3" ? 9 : formType === "TYPE_4" ? 7 : 5;

  if (cells.length >= expectedCells && /^\d+$/.test(cells[0] ?? "")) {
    return cells.slice(0, expectedCells);
  }

  return null;
}

function extractPdfResultRows(lines: string[], formType: AppFormType) {
  const headerIndex = findIndex(
    lines,
    formType === "TYPE_1"
      ? /NO\b.*PARAMETER\b.*UNIT\b.*SPECIFICATION\b.*RESULT\b.*METHODS\b/i
      : formType === "TYPE_3"
        ? /NO\b.*PARAMETER\b.*METHOD\b.*UNIT\b.*RESULT\b.*LIMIT/i
        : formType === "TYPE_4"
          ? /NO\b.*PARAMETER\b.*METHOD\b.*UNIT\b.*RESULT\b.*LIMIT/i
        : /NO\b.*PARAMETER\b.*UNIT\b.*RESULT\b.*METHODS\b/i,
  );
  const separateHeaderIndex =
    headerIndex >= 0
      ? headerIndex
      : findIndex(lines, /^NO$/i) >= 0 && findIndex(lines, /^PARAMETER$/i) >= 0
        ? findIndex(lines, /^NO$/i)
        : -1;

  if (separateHeaderIndex < 0) return [];

  const headerCells =
    formType === "TYPE_1"
      ? ["NO", "PARAMETER", "UNIT", "SPECIFICATION", "RESULT", "METHODS"]
      : formType === "TYPE_3"
        ? ["NO", "PARAMETER", "METHOD", "UNIT", "RESULT", "LIMIT (CF) MIN", "LIMIT (CF) MAX", "LIMIT (SF) MIN", "LIMIT (SF) MAX"]
      : formType === "TYPE_4"
        ? ["NO", "PARAMETER", "METHOD", "UNIT", "RESULT", "LIMIT (TB) MIN", "LIMIT (TB) MAX"]
      : ["NO", "PARAMETER", "UNIT", "RESULT", "METHODS"];
  const startIndex = headerIndex >= 0 ? headerIndex + 1 : separateHeaderIndex + headerCells.length;
  const tableRows: string[][] = [headerCells];

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];
    if (isResultTableStopLine(line)) break;

    const inlineRow = parsePdfInlineResultRow(line, formType);
    if (inlineRow) {
      tableRows.push(inlineRow);
      continue;
    }

    if (!/^\d+$/.test(line)) continue;

    const expectedDataCells = formType === "TYPE_1" ? 5 : formType === "TYPE_3" ? 8 : formType === "TYPE_4" ? 6 : 4;
    const row = [line];

    for (let offset = 1; offset <= expectedDataCells; offset += 1) {
      const value = lines[index + offset];
      if (!value || isResultTableStopLine(value)) break;
      row.push(value);
    }

    if (row.length === expectedDataCells + 1) {
      tableRows.push(row);
      index += expectedDataCells;
    }
  }

  return tableRows.length > 1 ? tableRows : [];
}

function extractAdditionalInfo(lines: string[], formType: AppFormType) {
  if (formType === "TYPE_1") {
    return [
      {
        label: "Brand/ Merek",
        value: cleanAdditionalInfoValue(extractNumberedValue(lines, /Brand\/\s*Merek/i)),
      },
      {
        label: "Address of Sampling/ Lokasi Pengambilan",
        value: cleanAdditionalInfoValue(extractNumberedValue(lines, /Address of Sampling|Lokasi Pengambilan/i)),
      },
      {
        label: "Parameter",
        value: cleanAdditionalInfoValue(extractNumberedValue(lines, /Parameter/i)),
      },
      {
        label: "No BAPC",
        value: cleanAdditionalInfoValue(extractNumberedValue(lines, /No BAPC/i)),
      },
    ];
  }

  if (formType === "TYPE_2") {
    const merk = extractInlineLabelValue(lines, /^Merk\s*:/i);
    const vessel = extractNumberedValue(lines, /^(?:\d+\.\d+\.\d+\.\s*)?Vessel\s*\/\s*Kapal/i);
    const bl = extractNumberedValue(lines, /^(?:\d+\.\d+\.\d+\.\s*)?BL\b/i);
    const gudang = extractNumberedValue(lines, /^(?:\d+\.\d+\.\d+\.\s*)?Gudang\b/i);

    return [
      ...(merk
        ? [
            {
              label: "Merk",
              value: merk,
            },
          ]
        : []),
      ...(vessel ? [{ label: "Vessel/ Kapal", value: vessel }] : []),
      ...(bl ? [{ label: "BL", value: bl }] : []),
      ...(gudang ? [{ label: "Gudang", value: gudang }] : []),
    ];
  }

  return [];
}

function detectFormType(lines: string[], table: string[][]): AppFormType {
  const headerRows = table.slice(0, 2);
  const header = headerRows.flat();
  const firstHeaderRow = headerRows[0] ?? [];
  const secondHeaderRow = headerRows[1] ?? [];
  const hasMethodColumn = firstHeaderRow.some((cell) => /^Method$/i.test(cell));
  const limitGroupCount = firstHeaderRow.filter((cell) => /^Limit\b/i.test(cell)).length;
  const limitSubcolumnCount = secondHeaderRow.filter((cell) => /^(Min|Max)$/i.test(cell)).length;

  if (hasMethodColumn && limitGroupCount >= 2 && limitSubcolumnCount >= 4) {
    return "TYPE_3";
  }

  if (hasMethodColumn && limitGroupCount === 1 && limitSubcolumnCount >= 2) {
    return "TYPE_4";
  }

  if (
    header.some((cell) => /Limit\s*\(CF\)|Limit\s*\(SF\)/i.test(cell)) ||
    lines.some((line) => /Limit\s*\(CF\)|Limit\s*\(SF\)/i.test(line))
  ) {
    return "TYPE_3";
  }

  if (
    header.some((cell) => /Limit\s*\(TB\)/i.test(cell)) ||
    lines.some((line) => /Limit\s*\(TB\)/i.test(line))
  ) {
    return "TYPE_4";
  }

  if (
    header.some((cell) => /SPECIFICATION/i.test(cell)) ||
    lines.some((line) => /^SPECIFICATION$/i.test(line)) ||
    lines.some((line) => /\bPARAMETER\b.*\bSPECIFICATION\b.*\bRESULT\b/i.test(line))
  ) {
    return "TYPE_1";
  }

  return "TYPE_2";
}

function parseLhuFromText(lines: string[], table: string[][]): ParsedDocx {
  const formType = detectFormType(lines, table);
  const resultTable = table.length ? table : extractPdfResultRows(lines, formType);
  const payload = createEmptyLhuPayload(formType);
  const parsedResults = parseResults(resultTable, formType);
  const issue = extractIssue(lines);
  const nextSectionPattern = /^\d+\.\d+\.|^[IVX]+\.|^No\.\s*LP|^Date\b|^Tanggal\b|^Sampling\b/i;

  payload.reportNo = extractReportNo(lines);
  payload.orderNo = extractLooseValue(lines, /No\.\s*Order|Nomor Pekerjaan/i, nextSectionPattern);
  payload.principal.name = extractLooseValue(lines, /^(?:2\.1\.\s*)?Name\s*\/\s*Nama/i, nextSectionPattern);
  payload.principal.address = collectContinuation(
    lines,
    findIndex(lines, /^(?:2\.2\.\s*)?Address\s*\/\s*Alamat/i),
    /^III\.|^Sampel\s*\/|^Sample Number|^3\.1\./i,
  );
  payload.sample.sampleNo = extractLooseValue(lines, /^(?:3\.1\.\s*)?Sample (?:Number|Nomer|Nomor)\s*\/\s*Nomor (?:Contoh|Sampel)/i, nextSectionPattern);
  payload.sample.sampleName = extractLooseValue(lines, /^(?:3\.2\.\s*)?Sample Name\s*\/\s*Nama (?:Contoh|Sampel)/i, nextSectionPattern);
  payload.sample.packaging = extractLooseValue(lines, /^(?:3\.3\.\s*)?Packaging\s*\/\s*Kemasan/i, nextSectionPattern);
  payload.sample.commodity = extractNumberedValue(lines, /Commodity\/\s*Komoditi/i);
  payload.sample.type = extractNumberedValue(lines, /Type\/\s*Jenis/i);
  payload.sample.sniNo = extractLooseValue(lines, /Number of SNI|Nomor SNI/i, nextSectionPattern);
  payload.sample.additionalInfo = extractAdditionalInfo(lines, formType);
  payload.receivedDate = extractLooseValue(lines, /Date of Received|Tanggal Terima/i, nextSectionPattern);
  payload.analysisDate = extractLooseValue(lines, /Date of Analysis|Tanggal Uji/i, nextSectionPattern);
  payload.sample.sampling = extractLooseValue(lines, /Sampling\/Pengambilan Sample/i, nextSectionPattern) || "-";
  payload.results = parsedResults.results.length ? parsedResults.results : payload.results;
  payload.notes = parsedResults.notes || payload.notes;
  payload.issue = issue.issue;
  payload.signer = issue.signer;

  const title = `LHU ${payload.sample.sampleName} ${payload.principal.name}`.trim();

  return {
    formType,
    title,
    payload,
  };
}

export async function parseLhuDocxFile(file: File): Promise<ParsedDocx> {
  if (!file.name.toLowerCase().endsWith(".docx")) {
    throw new Error("File harus berformat .docx.");
  }

  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const documentText = await zip.file("word/document.xml")?.async("text");

  if (!documentText) {
    throw new Error("Isi dokumen Word tidak dapat dibaca.");
  }

  const lines = extractWordParagraphs(documentText);
  const table = extractWordTables(documentText)[0] ?? [];

  return parseLhuFromText(lines, table);
}

function decodePdfLiteralString(value: string) {
  let result = "";

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (char !== "\\") {
      result += char;
      continue;
    }

    const next = value[index + 1];
    index += 1;

    if (next === "n") result += "\n";
    else if (next === "r") result += "\r";
    else if (next === "t") result += "\t";
    else if (next === "b") result += "\b";
    else if (next === "f") result += "\f";
    else if (next === "\r" || next === "\n") {
      if (next === "\r" && value[index + 1] === "\n") index += 1;
    } else if (next && /[0-7]/.test(next)) {
      let octal = next;
      for (let count = 0; count < 2 && /[0-7]/.test(value[index + 1] ?? ""); count += 1) {
        octal += value[index + 1];
        index += 1;
      }
      result += String.fromCharCode(Number.parseInt(octal, 8));
    } else {
      result += next ?? "";
    }
  }

  return result;
}

function decodePdfHexString(value: string) {
  const clean = value.replace(/\s+/g, "");
  const evenHex = clean.length % 2 === 0 ? clean : `${clean}0`;
  const bytes = evenHex.match(/.{1,2}/g)?.map((item) => Number.parseInt(item, 16)) ?? [];

  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    let text = "";
    for (let index = 2; index < bytes.length; index += 2) {
      text += String.fromCharCode(((bytes[index] ?? 0) << 8) + (bytes[index + 1] ?? 0));
    }
    return text;
  }

  return String.fromCharCode(...bytes);
}

function extractPdfStrings(segment: string) {
  const strings: string[] = [];

  for (let index = 0; index < segment.length; index += 1) {
    const char = segment[index];

    if (char === "(") {
      let depth = 1;
      let value = "";
      index += 1;

      for (; index < segment.length; index += 1) {
        const current = segment[index];

        if (current === "\\") {
          value += current + (segment[index + 1] ?? "");
          index += 1;
          continue;
        }

        if (current === "(") {
          depth += 1;
        } else if (current === ")") {
          depth -= 1;
          if (depth === 0) break;
        }

        value += current;
      }

      strings.push(decodePdfLiteralString(value));
      continue;
    }

    if (char === "<" && segment[index + 1] !== "<") {
      const endIndex = segment.indexOf(">", index + 1);
      if (endIndex < 0) continue;

      const value = segment.slice(index + 1, endIndex);
      if (/^[\da-f\s]+$/i.test(value)) {
        strings.push(decodePdfHexString(value));
      }
      index = endIndex;
    }
  }

  return strings.map((value) => value.replace(/\u0000/g, "")).filter(Boolean);
}

function extractTextFromPdfContent(content: string) {
  const lines: string[] = [];
  const textBlockPattern = /BT([\s\S]*?)ET/g;
  const operatorPattern = /([\s\S]*?)(?:Tj|TJ|'|")/g;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = textBlockPattern.exec(content))) {
    const block = blockMatch[1] ?? "";
    let operatorMatch: RegExpExecArray | null;

    while ((operatorMatch = operatorPattern.exec(block))) {
      const text = normalizeText(extractPdfStrings(operatorMatch[1] ?? "").join(""));
      if (text) lines.push(text);
    }
  }

  if (lines.length) return lines.join("\n");

  return extractPdfStrings(content).map(normalizeText).filter(Boolean).join("\n");
}

async function inflatePdfStream(value: string) {
  if (typeof DecompressionStream === "undefined") return "";

  const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 255);

  for (const format of ["deflate", "deflate-raw"] as const) {
    try {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format));
      return await new Response(stream).text();
    } catch {
      // Try the next supported deflate flavor.
    }
  }

  return "";
}

async function extractPdfText(file: File) {
  const raw = pdfTextDecoder.decode(await file.arrayBuffer());
  const chunks = [raw];
  const streamPattern = /<<(.*?)>>\s*stream\r?\n?([\s\S]*?)\r?\n?endstream/g;
  let streamMatch: RegExpExecArray | null;

  while ((streamMatch = streamPattern.exec(raw))) {
    const dictionary = streamMatch[1] ?? "";
    const stream = streamMatch[2] ?? "";

    if (/\/FlateDecode\b/.test(dictionary)) {
      const inflated = await inflatePdfStream(stream);
      if (inflated) chunks.push(inflated);
    } else {
      chunks.push(stream);
    }
  }

  return chunks.map(extractTextFromPdfContent).join("\n");
}

export async function parseLhuPdfFile(file: File): Promise<ParsedDocx> {
  if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
    throw new Error("File harus berformat .pdf.");
  }

  const text = await extractPdfText(file);
  const lines = text.split(/\r?\n+/).map(normalizeText).filter(Boolean);

  if (!lines.length) {
    throw new Error("Teks PDF tidak dapat dibaca. Untuk PDF hasil scan gambar, lakukan OCR atau upload file Word/PDF yang masih berisi teks.");
  }

  return parseLhuFromText(lines, []);
}

export async function parseLhuImportFile(file: File): Promise<ParsedDocx> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".docx")) {
    return parseLhuDocxFile(file);
  }

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return parseLhuPdfFile(file);
  }

  throw new Error("File harus berformat .docx atau .pdf.");
}
