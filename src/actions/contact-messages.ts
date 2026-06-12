"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth";
import { canViewContactMessages } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { buildMessageUrl } from "@/lib/utils";

const allowedStatuses = new Set(["unread", "read", "archived"]);

export async function updateContactMessageStatusAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();

  if (!canViewContactMessages(actor.role)) {
    redirect("/dashboard");
  }

  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!id || !allowedStatuses.has(status)) {
    redirect(buildMessageUrl("/messages", "error", "Data pesan tidak valid."));
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
  redirect(buildMessageUrl("/messages", "success", "Status pesan berhasil diperbarui."));
}
