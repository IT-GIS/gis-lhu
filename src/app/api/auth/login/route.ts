import { NextResponse } from "next/server";

import { authenticateUser, createUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { trimToNull } from "@/lib/utils";

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
    console.error("Login route failed", error);
    return NextResponse.json({ error: "Terjadi gangguan saat memproses login. Silakan coba lagi." }, { status: 500 });
  }
}
