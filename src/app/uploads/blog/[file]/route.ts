import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const mimeTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function getUploadDir() {
  return path.join(process.cwd(), "uploads", "blog");
}

type Params = Promise<{ file: string }>;

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Params;
  },
) {
  const { file } = await params;
  const safeFileName = path.basename(file);

  if (safeFileName !== file) {
    return new NextResponse("Invalid file name", { status: 400 });
  }

  const extension = path.extname(safeFileName).toLowerCase();
  const contentType = mimeTypes[extension];

  if (!contentType) {
    return new NextResponse("Unsupported file type", { status: 400 });
  }

  try {
    const filePath = path.join(getUploadDir(), safeFileName);
    const buffer = await readFile(filePath);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
