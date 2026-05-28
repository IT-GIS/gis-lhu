"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

import { requireAuthenticatedUser } from "@/lib/auth";
import {
  addReviewComment,
  createDocument,
  deleteDocument,
  transitionDocument,
  updateDocument,
} from "@/lib/documents";
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
  let redirectUrl = "/documents/new";

  try {
    const created = await createDocument(actor, getFormValues(formData));

    revalidatePath("/dashboard");
    revalidatePath("/documents");
    redirectUrl = buildMessageUrl(`/documents/${created.id}`, "success", "Dokumen berhasil dibuat.");
  } catch (error) {
    redirectUrl = buildMessageUrl("/documents/new", "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}

export async function updateDocumentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  const documentId = values.documentId;
  let redirectUrl = `/documents/${documentId}`;

  try {
    await updateDocument(actor, values);

    revalidatePath("/dashboard");
    revalidatePath("/documents");
    revalidatePath(`/documents/${documentId}`);
    redirectUrl = buildMessageUrl(`/documents/${documentId}`, "success", "Dokumen berhasil diperbarui.");
  } catch (error) {
    redirectUrl = buildMessageUrl(`/documents/${documentId}`, "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}

export async function deleteDocumentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  let redirectUrl = "/documents";

  try {
    await deleteDocument(actor, values);

    revalidatePath("/dashboard");
    revalidatePath("/documents");
    revalidatePath("/published");
    redirectUrl = buildMessageUrl("/documents", "success", "Dokumen LHU berhasil dihapus permanen.");
  } catch (error) {
    redirectUrl = buildMessageUrl("/documents", "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}

export async function transitionDocumentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  const documentId = values.documentId;
  let redirectUrl = `/documents/${documentId}`;

  try {
    await transitionDocument(actor, values);

    revalidatePath("/dashboard");
    revalidatePath("/documents");
    revalidatePath("/review");
    revalidatePath("/published");
    revalidatePath(`/documents/${documentId}`);
    redirectUrl = buildMessageUrl(`/documents/${documentId}`, "success", "Status dokumen berhasil diperbarui.");
  } catch (error) {
    redirectUrl = buildMessageUrl(`/documents/${documentId}`, "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}

export async function addReviewCommentAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  const documentId = values.documentId;
  let redirectUrl = `/documents/${documentId}`;

  try {
    await addReviewComment(actor, values);

    revalidatePath(`/documents/${documentId}`);
    redirectUrl = buildMessageUrl(`/documents/${documentId}`, "success", "Komentar review berhasil ditambahkan.");
  } catch (error) {
    redirectUrl = buildMessageUrl(`/documents/${documentId}`, "error", getErrorMessage(error));
  }

  redirect(redirectUrl);
}
