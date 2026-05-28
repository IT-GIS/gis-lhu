import { notFound, redirect } from "next/navigation";

import { updateBlogPostAction } from "@/actions/blog-posts";
import { BlogPostForm } from "@/components/blog-post-form";
import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getBlogPostById } from "@/lib/blog-posts";
import { canManageBlogPosts } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const user = await requireAuthenticatedUser();

  if (!canManageBlogPosts(user.role)) {
    redirect("/dashboard");
  }

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const success = typeof query.success === "string" ? query.success : undefined;
  const error = typeof query.error === "string" ? query.error : undefined;

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title={post.title}
        description={`Terakhir diperbarui ${formatDate(post.updatedAt)} oleh ${post.updater?.name ?? post.creator?.name ?? "admin"}.`}
      />

      <FlashMessage success={success} error={error} />

      <SectionCard title="Konten artikel" description="Edit field post lalu simpan untuk memperbarui halaman Informasi">
        <BlogPostForm action={updateBlogPostAction} post={post} submitLabel="Update Post" />
      </SectionCard>
    </div>
  );
}
