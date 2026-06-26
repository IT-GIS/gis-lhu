import { NextResponse } from "next/server";

import { requireAuthenticatedUser } from "@/lib/auth";
import { getDocumentDetail } from "@/lib/documents";
import { resolveLhuPayload } from "@/lib/lhu-payload";
import { buildVerificationQrCodeBuffer } from "@/lib/verification";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function safeFilenamePart(value: string) {
  return value
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 90);
}

function extractReportCode(value?: string | null) {
  const raw = value?.trim();

  if (!raw) return "LHU";

  const parts = raw
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  // Contoh: LP/ J-0027B/26 → J-0027B
  if (parts.length >= 3) {
    return parts[1];
  }

  return raw;
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await requireAuthenticatedUser();
  const { id } = await context.params;
  const document = await getDocumentDetail(id, user.role);

  if (!document) {
    return NextResponse.json(
      { message: "Dokumen tidak ditemukan." },
      { status: 404 },
    );
  }

  if (!document.verification?.token) {
    return NextResponse.json(
      { message: "Barcode verifikasi belum tersedia." },
      { status: 404 },
    );
  }

  const payload = resolveLhuPayload(document.formType, document.formPayload);

  const buffer = await buildVerificationQrCodeBuffer(
    document.verification.token,
  );

  const reportCode = safeFilenamePart(
    extractReportCode(
      payload.reportNo || document.referenceNo || document.documentNumber,
    ),
  );

  const clientName = safeFilenamePart(
    payload.principal.name || document.clientName || document.title || "Klien",
  );

  const filename = `${reportCode} - ${clientName}.png`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(
        filename,
      )}`,
      "Cache-Control": "no-store",
    },
  });
}
