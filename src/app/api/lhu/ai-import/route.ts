import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { env } from "@/lib/env";
import {
  buildLhuAiImportPrompt,
  lhuAiImportSchema,
  validateAiImportResult,
} from "@/lib/lhu-ai-import";
import { extractLhuImportContext } from "@/lib/lhu-docx-parser";
import { canCreateDocument } from "@/lib/permissions";

export const runtime = "nodejs";

const maxFileSize = 12 * 1024 * 1024;

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "AI tidak dapat membaca dokumen ini dengan aman.";
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return errorResponse("Sesi login tidak ditemukan.", 401);
  }

  if (!canCreateDocument(user.role)) {
    return errorResponse("Anda tidak memiliki akses untuk import dokumen dengan AI.", 403);
  }

  if (!env.openaiApiKey || env.openaiApiKey.includes("isi_api_key")) {
    return errorResponse("OPENAI_API_KEY belum diset di server.", 500);
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return errorResponse("File dokumen tidak ditemukan.");
  }

  if (file.size > maxFileSize) {
    return errorResponse("Ukuran file maksimal 12MB.");
  }

  try {
    const context = await extractLhuImportContext(file);
    const client = new OpenAI({ apiKey: env.openaiApiKey });

    const response = await client.responses.parse({
      model: env.openaiLhuModel,
      store: false,
      max_output_tokens: 6000,
      safety_identifier: user.id,
      instructions:
        "Anda adalah asisten ekstraksi dokumen LHU laboratorium. Tugas Anda hanya membaca isi dokumen dan mengembalikan JSON sesuai schema. Jangan mengarang data dan jangan menjelaskan di luar JSON.",
      input: buildLhuAiImportPrompt(context),
      text: {
        format: zodTextFormat(lhuAiImportSchema, "lhu_ai_import"),
      },
    });

    if (!response.output_parsed) {
      return errorResponse("AI tidak mengembalikan hasil JSON yang valid.");
    }

    const validated = validateAiImportResult(response.output_parsed, env.openaiLhuMinConfidence);

    return NextResponse.json({
      ok: true,
      parsed: {
        formType: validated.formType,
        title: `LHU ${validated.payload.sample.sampleName} ${validated.payload.principal.name}`.trim(),
        payload: validated.payload,
        confidence: validated.confidence,
        warnings: validated.warnings,
        source: "ai",
      },
    });
  } catch (error) {
    return errorResponse(getErrorMessage(error));
  }
}
