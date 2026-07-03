import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { requireAuthenticatedUser } from "@/lib/auth";
import { canManageBlogPosts } from "@/lib/permissions";

export const runtime = "nodejs";

const allowedMimeTypes = new Map([
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

function getUploadDir() {
  return path.join(process.cwd(), "uploads", "blog");
}

function createSafeFileName(originalName: string, extension: string) {
  const baseName = originalName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

  return `${baseName || "cover"}-${randomUUID()}${extension}`;
}

export async function POST(request: Request) {
  const user = await requireAuthenticatedUser();

  if (!canManageBlogPosts(user.role)) {
    return NextResponse.json(
      { ok: false, error: "Anda tidak memiliki akses untuk upload gambar." },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "File gambar tidak ditemukan." },
      { status: 400 },
    );
  }

  const extension = allowedMimeTypes.get(file.type);

  if (!extension) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Format gambar tidak didukung. Gunakan PNG, JPG, WEBP, atau GIF.",
      },
      { status: 400 },
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { ok: false, error: "Ukuran gambar maksimal 5MB." },
      { status: 400 },
    );
  }

  const uploadDir = getUploadDir();
  await mkdir(uploadDir, { recursive: true });

  const fileName = createSafeFileName(file.name, extension);
  const filePath = path.join(uploadDir, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, bytes);

  return NextResponse.json({
    ok: true,
    path: `/uploads/blog/${fileName}`,
  });
}
