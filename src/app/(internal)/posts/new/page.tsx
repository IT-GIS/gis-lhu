import { redirect } from "next/navigation";

import { createBlogPostAction } from "@/actions/blog-posts";
import { BlogPostForm } from "@/components/blog-post-form";
import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { requireAuthenticatedUser } from "@/lib/auth";
import { canManageBlogPosts } from "@/lib/permissions";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NewPostPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireAuthenticatedUser();

  if (!canManageBlogPosts(user.role)) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Tambah post baru"
        description="Tulis artikel seperti workflow WordPress sederhana: judul, slug, cover, excerpt, konten, dan status publish."
      />

      <FlashMessage error={error} />

      <SectionCard title="Editor post" description="Isi konten yang akan tampil di halaman Informasi">
        <BlogPostForm action={createBlogPostAction} submitLabel="Simpan Post" />
      </SectionCard>
    </div>
  );
}
