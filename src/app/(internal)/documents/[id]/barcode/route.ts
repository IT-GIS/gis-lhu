import { NextResponse } from "next/server";

import { requireAuthenticatedUser } from "@/lib/auth";
import { getDocumentDetail } from "@/lib/documents";
import { buildVerificationQrCodeBuffer } from "@/lib/verification";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function safeFilename(value: string) {
  return value
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await requireAuthenticatedUser();
  const { id } = await context.params;
  const document = await getDocumentDetail(id, user.role);

  if (!document) {
    return NextResponse.json({ message: "Dokumen tidak ditemukan." }, { status: 404 });
  }

  if (!document.verification?.token) {
    return NextResponse.json({ message: "Barcode verifikasi belum tersedia." }, { status: 404 });
  }

  const buffer = await buildVerificationQrCodeBuffer(document.verification.token);
  const filename = `${safeFilename(document.referenceNo || document.documentNumber)}-barcode.png`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
