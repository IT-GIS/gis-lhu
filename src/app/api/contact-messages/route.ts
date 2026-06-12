import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  subject?: unknown;
};

function normalizeText(value: unknown, maxLength = 191) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeMessage(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 5000) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Format data tidak valid." }, { status: 400 });
  }

  const name = normalizeText(payload.name);
  const email = normalizeText(payload.email).toLowerCase();
  const subject = normalizeText(payload.subject || "Pesan dari halaman Contact Us");
  const message = normalizeMessage(payload.message);
  const userAgent = normalizeText(request.headers.get("user-agent"), 500);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Nama, email, dan pesan wajib diisi." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Format email belum valid." }, { status: 400 });
  }

  const id = crypto.randomUUID();

  try {
    await prisma.$executeRaw`
      INSERT INTO contactmessage
        (id, name, email, subject, message, status, source, userAgent, createdAt, updatedAt)
      VALUES
        (${id}, ${name}, ${email}, ${subject}, ${message}, 'unread', 'contact_page', ${userAgent}, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
    `;

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save contact message", error);

    return NextResponse.json(
      { error: "Pesan belum bisa disimpan ke database. Pastikan tabel contactmessage sudah dibuat." },
      { status: 500 },
    );
  }
}
