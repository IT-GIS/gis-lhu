"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

import { requireAuthenticatedUser } from "@/lib/auth";
import { addReviewComment, createDocument, transitionDocument, updateDocument } from "@/lib/documents";
import { buildMessageUrl } from "@/lib/utils";

function getFormValues(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
  ) as Record<string, string>;
}

function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? "Input tidak valid.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan yang tidak terduga.";
}

export async function createDocumentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();

  try {
    const created = await createDocument(actor, getFormValues(formData));

    revalidatePath("/dashboard");
    revalidatePath("/documents");
    redirect(buildMessageUrl(`/documents/${created.id}`, "success", "Dokumen berhasil dibuat."));
  } catch (error) {
    redirect(buildMessageUrl("/documents/new", "error", getErrorMessage(error)));
  }
}

export async function updateDocumentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  const documentId = values.documentId;

  try {
    await updateDocument(actor, values);

    revalidatePath("/dashboard");
    revalidatePath("/documents");
    revalidatePath(`/documents/${documentId}`);
    redirect(buildMessageUrl(`/documents/${documentId}`, "success", "Dokumen berhasil diperbarui."));
  } catch (error) {
    redirect(buildMessageUrl(`/documents/${documentId}`, "error", getErrorMessage(error)));
  }
}

export async function transitionDocumentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  const documentId = values.documentId;

  try {
    await transitionDocument(actor, values);

    revalidatePath("/dashboard");
    revalidatePath("/documents");
    revalidatePath("/review");
    revalidatePath("/published");
    revalidatePath(`/documents/${documentId}`);
    redirect(buildMessageUrl(`/documents/${documentId}`, "success", "Status dokumen berhasil diperbarui."));
  } catch (error) {
    redirect(buildMessageUrl(`/documents/${documentId}`, "error", getErrorMessage(error)));
  }
}

export async function addReviewCommentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  const documentId = values.documentId;

  try {
    await addReviewComment(actor, values);

    revalidatePath(`/documents/${documentId}`);
    redirect(buildMessageUrl(`/documents/${documentId}`, "success", "Komentar review berhasil ditambahkan."));
  } catch (error) {
    redirect(buildMessageUrl(`/documents/${documentId}`, "error", getErrorMessage(error)));
  }
}
