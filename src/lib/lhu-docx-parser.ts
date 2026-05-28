import JSZip from "jszip";

import type { AppFormType } from "@/lib/domain";
import { createEmptyLhuPayload, type LhuPayload, type LhuResultRow } from "@/lib/lhu-payload";

const WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

type ParsedDocx = {
  formType: AppFormType;
  title: string;
  payload: LhuPayload;
};

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function getNodeText(node: Element) {
  return Array.from(node.getElementsByTagNameNS(WORD_NS, "t"))
    .map((textNode) => textNode.textContent ?? "")
    .join("");
}

function hasTableAncestor(node: Element) {
  let current = node.parentElement;

  while (current) {
    if (current.localName === "tbl") return true;
    current = current.parentElement;
  }

  return false;
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

function extractNumberedValue(lines: string[], pattern: RegExp, stopPattern = /^\d+\.\d+\.|^[IVX]+\./) {
  const index = findIndex(lines, pattern);
  return collectContinuation(lines, index, stopPattern);
}

function extractIssue(lines: string[]) {
  const issueIndex = findIndex(lines, /^[A-Za-z .]+,\s+\d{1,2}\s+\S+\s+\d{4}$/i);

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

  const line = issueIndex >= 0 ? lines[issueIndex] : "";
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

function extractTables(documentXml: XMLDocument) {
  return Array.from(documentXml.getElementsByTagNameNS(WORD_NS, "tbl")).map((table) =>
    Array.from(table.getElementsByTagNameNS(WORD_NS, "tr")).map((row) =>
      Array.from(row.getElementsByTagNameNS(WORD_NS, "tc")).map((cell) => normalizeText(getNodeText(cell))),
    ),
  );
}

function parseResults(rows: string[][], formType: AppFormType) {
  const results: LhuResultRow[] = [];
  let notes = "";

  rows.slice(1).forEach((cells) => {
    const firstCell = cells[0] ?? "";

    if (/^\d+$/.test(firstCell)) {
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

    const noteText = cells.join(" ");
    if (/catatan/i.test(noteText)) {
      notes = noteText.replace(/^Catatan\s*:?\s*/i, "");
    }
  });

  return { results, notes };
}

function extractAdditionalInfo(lines: string[], formType: AppFormType) {
  if (formType === "TYPE_1") {
    return [
      {
        label: "Brand/ Merek",
        value: extractNumberedValue(lines, /Brand\/\s*Merek/i),
      },
      {
        label: "Address of Sampling/ Lokasi Pengambilan",
        value: extractNumberedValue(lines, /Address of Sampling|Lokasi Pengambilan/i),
      },
      {
        label: "Parameter",
        value: extractNumberedValue(lines, /Parameter/i),
      },
      {
        label: "No BAPC",
        value: extractNumberedValue(lines, /No BAPC/i),
      },
    ];
  }

  return [
    {
      label: "Vessel/ Kapal",
      value: extractNumberedValue(lines, /Vessel\/\s*Kapal/i),
    },
    {
      label: "BL",
      value: extractNumberedValue(lines, /\bBL\b/i),
    },
    {
      label: "Gudang",
      value: extractNumberedValue(lines, /Gudang/i),
    },
  ];
}

function extractParagraphs(documentXml: XMLDocument) {
  return Array.from(documentXml.getElementsByTagNameNS(WORD_NS, "p"))
    .filter((paragraph) => !hasTableAncestor(paragraph))
    .map((paragraph) => normalizeText(getNodeText(paragraph)))
    .filter(Boolean);
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

  const documentXml = new DOMParser().parseFromString(documentText, "application/xml");
  const lines = extractParagraphs(documentXml);
  const table = extractTables(documentXml)[0] ?? [];
  const header = table[0] ?? [];
  const formType: AppFormType = header.some((cell) => /SPECIFICATION/i.test(cell)) ? "TYPE_1" : "TYPE_2";
  const payload = createEmptyLhuPayload(formType);
  const parsedResults = parseResults(table, formType);
  const issue = extractIssue(lines);

  payload.reportNo = extractAfterColon(findLine(lines, /^No\.\s*LP\//i));
  payload.orderNo = extractAfterColon(findLine(lines, /No\.\s*Order|Nomor Pekerjaan/i));
  payload.principal.name = extractAfterColon(findLine(lines, /2\.1\.\s*Name\s*\/\s*Nama/i));
  payload.principal.address = collectContinuation(
    lines,
    findIndex(lines, /2\.2\.\s*Address\s*\/\s*Alamat/i),
    /^III\.|^3\.1\./,
  );
  payload.sample.sampleNo = extractAfterColon(findLine(lines, /3\.1\.\s*Sample/i));
  payload.sample.sampleName = extractAfterColon(findLine(lines, /3\.2\.\s*Sample Name/i));
  payload.sample.packaging = extractAfterColon(findLine(lines, /3\.3\.\s*Packaging/i));
  payload.sample.commodity = extractNumberedValue(lines, /Commodity\/\s*Komoditi/i);
  payload.sample.type = extractNumberedValue(lines, /Type\/\s*Jenis/i);
  payload.sample.additionalInfo = extractAdditionalInfo(lines, formType);
  payload.receivedDate = extractAfterColon(findLine(lines, /Date of Received|Tanggal Terima/i));
  payload.analysisDate = extractAfterColon(findLine(lines, /Date of Analysis|Tanggal Uji/i));
  payload.sample.sampling = formType === "TYPE_2" ? extractAfterColon(findLine(lines, /Sampling\/Pengambilan Sample/i)) || "-" : "";
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
