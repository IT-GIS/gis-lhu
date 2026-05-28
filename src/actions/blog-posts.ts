"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

import { requireAuthenticatedUser } from "@/lib/auth";
import { createBlogPost, updateBlogPost } from "@/lib/blog-posts";
import { buildMessageUrl } from "@/lib/utils";

function getFormValues(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
  ) as Record<string, string>;
}

function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? "Input post tidak valid.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan yang tidak terduga.";
}

export async function createBlogPostAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();

  try {
    const post = await createBlogPost(actor, getFormValues(formData));

    revalidatePath("/posts");
    revalidatePath("/informasi");
    revalidatePath(`/informasi/${post.slug}`);
    redirect(buildMessageUrl(`/posts/${post.id}`, "success", "Post berhasil dibuat."));
  } catch (error) {
    redirect(buildMessageUrl("/posts/new", "error", getErrorMessage(error)));
  }
}

export async function updateBlogPostAction(formData: FormData) {
  const actor = await requireAuthenticatedUser();
  const values = getFormValues(formData);
  const postId = values.postId;

  try {
    const post = await updateBlogPost(actor, values);

    revalidatePath("/posts");
    revalidatePath(`/posts/${postId}`);
    revalidatePath("/informasi");
    revalidatePath(`/informasi/${post.slug}`);
    redirect(buildMessageUrl(`/posts/${post.id}`, "success", "Post berhasil diperbarui."));
  } catch (error) {
    redirect(buildMessageUrl(`/posts/${postId}`, "error", getErrorMessage(error)));
  }
}
