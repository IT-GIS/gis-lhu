import { NextResponse } from "next/server";

import { findPublishedVerification } from "@/lib/documents";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { value?: unknown };
    const value = typeof body.value === "string" ? body.value : "";
    const token = await findPublishedVerification(value);

    if (!token) {
      return NextResponse.json(
        {
          message:
            "Nomor order atau nomor LHU tidak ditemukan pada dokumen yang sudah dipublikasikan.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { message: "Pencarian verifikasi gagal diproses." },
      { status: 400 },
    );
  }
}
