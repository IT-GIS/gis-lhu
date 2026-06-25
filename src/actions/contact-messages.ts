"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth";
import { canViewContactMessages } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { buildMessageUrl } from "@/lib/utils";

const allowedStatuses = new Set(["unread", "read", "archived"]);

function getReturnTo(formData: FormData) {
  const raw = String(formData.get("returnTo") ?? "/messages").trim();

  if (!raw.startsWith("/messages")) {
    return "/messages";
  }

  return raw.slice(0, 500);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat memproses pesan.";
}

type ContactMessageLookup = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  status: "unread" | "read" | "archived";
};

export async function updateContactMessageStatusAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();

  if (!canViewContactMessages(actor.role)) {
    redirect("/dashboard");
  }

  const returnTo = getReturnTo(formData);
  let redirectUrl = returnTo;

  try {
    const id = String(formData.get("id") ?? "").trim();
    const status = String(formData.get("status") ?? "").trim();

    if (!id || !allowedStatuses.has(status)) {
      throw new Error("Data pesan tidak valid.");
    }

    await prisma.$executeRaw`
      UPDATE contactmessage
      SET status = ${status}, updatedAt = CURRENT_TIMESTAMP(3)
      WHERE id = ${id}
    `;

    await prisma.auditLog.create({
      data: {
        actorId: actor.id,
        action: "contact_message.update_status",
        entityType: "contactmessage",
        entityId: id,
        metadata: { status },
      },
    });

    revalidatePath("/messages");
    revalidatePath(`/messages/${id}`);

    redirectUrl = buildMessageUrl(
      returnTo,
      "success",
      "Status pesan berhasil diperbarui.",
    );
  } catch (error) {
    redirectUrl = buildMessageUrl(returnTo, "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}

export async function deleteContactMessageAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();

  if (!canViewContactMessages(actor.role)) {
    redirect("/dashboard");
  }

  let redirectUrl = "/messages";

  try {
    const id = String(formData.get("id") ?? "").trim();

    if (!id) {
      throw new Error("Data pesan tidak valid.");
    }

    const rows = await prisma.$queryRaw<ContactMessageLookup[]>`
      SELECT id, name, email, subject, status
      FROM contactmessage
      WHERE id = ${id}
      LIMIT 1
    `;

    const message = rows[0];

    if (!message) {
      throw new Error("Pesan tidak ditemukan atau sudah dihapus.");
    }

    await prisma.$executeRaw`
      DELETE FROM contactmessage
      WHERE id = ${id}
    `;

    await prisma.auditLog.create({
      data: {
        actorId: actor.id,
        action: "contact_message.delete",
        entityType: "contactmessage",
        entityId: id,
        metadata: {
          name: message.name,
          email: message.email,
          subject: message.subject,
          status: message.status,
        },
      },
    });

    revalidatePath("/messages");

    redirectUrl = buildMessageUrl(
      "/messages",
      "success",
      "Pesan berhasil dihapus.",
    );
  } catch (error) {
    redirectUrl = buildMessageUrl("/messages", "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}
