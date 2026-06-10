import { NextResponse } from "next/server";

import { authenticateUser, createUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { trimToNull } from "@/lib/utils";

function summarizeLoginError(error: unknown) {
  const databaseUrl = process.env.DATABASE_URL;
  let databaseHost = "unknown";
  let databaseProtocol = "unknown";

  if (databaseUrl) {
    try {
      const parsed = new URL(databaseUrl);
      databaseHost = parsed.hostname;
      databaseProtocol = parsed.protocol.replace(":", "");
    } catch {
      databaseHost = "unparseable";
    }
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      databaseHost,
      databaseProtocol,
    };
  }

  return { error, databaseHost, databaseProtocol };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = trimToNull(formData.get("email"));
    const password = trimToNull(formData.get("password"));

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json({ error: "Email atau password tidak valid." }, { status: 401 });
    }

    await createUserSession(user.id);

    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "auth.login",
          entityType: "user",
          entityId: user.id,
          metadata: {
            email: user.email,
          },
        },
      });
    } catch (auditError) {
      console.error("Failed to record login audit log", auditError);
    }

    return NextResponse.json({ ok: true, redirectTo: "/dashboard" });
  } catch (error) {
    console.error("Login route failed", summarizeLoginError(error));
    return NextResponse.json({ error: "Terjadi gangguan saat memproses login. Silakan coba lagi." }, { status: 500 });
  }
}
