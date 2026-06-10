"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import {
  authenticateUser,
  createUserSession,
  destroyUserSession,
  requireAuthenticatedUser, // Tambahkan import ini
} from "@/lib/auth";
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

// --- Tambahkan aksi ganti password di bawah ini ---

export async function changePasswordAction(formData: FormData) {
  const user = await requireAuthenticatedUser();

  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!oldPassword || !newPassword || !confirmPassword) {
    redirect("/akun?error=Semua kolom password harus diisi.");
  }

  if (newPassword !== confirmPassword) {
    redirect("/akun?error=Password baru dan konfirmasi password tidak cocok.");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect("/akun?error=Pengguna tidak ditemukan.");
  }

  // Verifikasi password lama
  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    dbUser.passwordHash,
  );
  if (!isPasswordMatch) {
    redirect("/akun?error=Password lama yang Anda masukkan salah.");
  }

  // Hash dan simpan password baru
  const salt = await bcrypt.genSalt(10);
  const newPasswordHash = await bcrypt.hash(newPassword, salt);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newPasswordHash },
  });

  // (Opsional) Catat ke audit log bahwa user mengganti password
  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: "auth.change_password",
      entityType: "user",
      entityId: user.id,
    },
  });

  redirect("/akun?success=Password Anda berhasil diperbarui.");
}
