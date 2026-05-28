"use server";

import { redirect } from "next/navigation";

import { authenticateUser, createUserSession, destroyUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { trimToNull } from "@/lib/utils";

export async function loginAction(formData: FormData) {
  const email = trimToNull(formData.get("email"));
  const password = trimToNull(formData.get("password"));

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const user = await authenticateUser(email, password);

  if (!user) {
    return { error: "Email atau password tidak valid." };
  }

  await createUserSession(user.id);
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

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroyUserSession();
  redirect("/login");
}
