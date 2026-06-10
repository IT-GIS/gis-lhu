import { NextResponse } from "next/server";

import { requireAuthenticatedUser } from "@/lib/auth";
import { getDocumentDetail } from "@/lib/documents";
import { buildLhuDocxBuffer } from "@/lib/lhu-docx";
import { resolveLhuPayload } from "@/lib/lhu-payload";

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

  const payload = resolveLhuPayload(document.formType, document.formPayload);
  const buffer = await buildLhuDocxBuffer({
    formType: document.formType,
    payload,
    documentNumber: document.documentNumber,
  });
  const filename = `${safeFilename(payload.reportNo || document.documentNumber)}.docx`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
