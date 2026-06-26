"use server";

import bcrypt from "bcryptjs";
import { Prisma, type Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth";
import { roles, type AppRole } from "@/lib/domain";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { buildMessageUrl, trimToNull } from "@/lib/utils";

function getString(formData: FormData, key: string) {
  return trimToNull(formData.get(key));
}

function getErrorMessage(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return "Email sudah terdaftar. Gunakan email lain.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat menambahkan user.";
}

export async function createUserAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  let redirectUrl = "/users";

  try {
    if (!canManageUsers(actor.role as AppRole)) {
      throw new Error("Anda tidak memiliki akses untuk menambah user.");
    }

    const name = getString(formData, "name");
    const email = getString(formData, "email")?.toLowerCase();
    const role = getString(formData, "role");
    const password = getString(formData, "password");

    if (!name || !email || !role || !password) {
      throw new Error("Nama, email, role, dan password wajib diisi.");
    }

    if (!roles.includes(role as AppRole)) {
      throw new Error("Role tidak valid.");
    }

    if (password.length < 8) {
      throw new Error("Password minimal 8 karakter.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        role: role as Role,
        passwordHash,
        active: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: actor.id,
        action: "user.create",
        entityType: "user",
        entityId: createdUser.id,
        metadata: {
          email: createdUser.email,
          role: createdUser.role,
        },
      },
    });

    revalidatePath("/users");
    redirectUrl = buildMessageUrl(
      "/users",
      "success",
      "Akun user berhasil ditambahkan.",
    );
  } catch (error) {
    redirectUrl = buildMessageUrl("/users", "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}

export async function deleteUserAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  let redirectUrl = "/users";

  try {
    if (!canManageUsers(actor.role as AppRole)) {
      throw new Error("Anda tidak memiliki akses untuk menghapus user.");
    }

    const value = formData.get("userId");
    const userId = typeof value === "string" ? value.trim() : "";

    if (!userId) {
      throw new Error("User tidak ditemukan.");
    }

    if (userId === actor.id) {
      throw new Error("Anda tidak dapat menghapus akun yang sedang digunakan.");
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
      },
    });

    if (!targetUser) {
      throw new Error("User tidak ditemukan.");
    }

    if (!targetUser.active) {
      throw new Error("Akun ini sudah nonaktif.");
    }

    if (targetUser.role === "SUPER_ADMIN") {
      const activeSuperAdminCount = await prisma.user.count({
        where: {
          role: "SUPER_ADMIN",
          active: true,
        },
      });

      if (activeSuperAdminCount <= 1) {
        throw new Error("Minimal harus ada satu akun Super Admin yang aktif.");
      }
    }

    await prisma.$transaction([
      prisma.session.deleteMany({
        where: {
          userId: targetUser.id,
        },
      }),

      prisma.user.update({
        where: {
          id: targetUser.id,
        },
        data: {
          active: false,
        },
      }),

      prisma.auditLog.create({
        data: {
          actorId: actor.id,
          action: "user.delete",
          entityType: "user",
          entityId: targetUser.id,
          metadata: {
            name: targetUser.name,
            email: targetUser.email,
            role: targetUser.role,
            mode: "soft_delete",
          },
        },
      }),
    ]);

    revalidatePath("/users");

    redirectUrl = buildMessageUrl(
      "/users",
      "success",
      "Akun user berhasil dihapus.",
    );
  } catch (error) {
    redirectUrl = buildMessageUrl("/users", "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}