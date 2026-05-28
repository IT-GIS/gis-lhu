import Link from "next/link";
import { redirect } from "next/navigation";

import { FlashMessage } from "@/components/flash-message";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/section-card";
import { Button } from "@/components/ui/button";
import { requireAuthenticatedUser } from "@/lib/auth";
import { blogPostStatusLabels, getBlogPosts } from "@/lib/blog-posts";
import { canManageBlogPosts } from "@/lib/permissions";
import { formatDate } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function PostsPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireAuthenticatedUser();

  if (!canManageBlogPosts(user.role)) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const success = typeof params.success === "string" ? params.success : undefined;
  const error = typeof params.error === "string" ? params.error : undefined;
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6 p-2 lg:p-4">
      <PageHeader
        title="Post artikel"
        description="Kelola artikel yang tampil di halaman Informasi. Hanya admin yang dapat membuat, mengubah, dan publish post."
        actions={
          <Button asChild>
            <Link href="/posts/new">Tambah Post Baru</Link>
          </Button>
        }
      />

      <FlashMessage success={success} error={error} />

      <SectionCard title="Daftar post" description={`${posts.length} post ditemukan`}>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block rounded-[28px] border border-sky-100 bg-sky-50/55 px-5 py-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-[var(--color-gis-navy)] dark:text-slate-100">{post.title}</h2>
                    <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[var(--color-gis-blue)]">
                      {blogPostStatusLabels[post.status]}
                    </span>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-600">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                    <span>/{post.slug}</span>
                    <span>Publish: {formatDate(post.publishedAt)}</span>
                    <span>Updated: {formatDate(post.updatedAt)}</span>
                    <span>Editor: {post.updater?.name ?? post.creator?.name ?? "-"}</span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-500">Edit post</div>
              </div>
            </Link>
          ))}

          {posts.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-sky-200 bg-sky-50/60 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60">
              Belum ada post. Mulai dari tombol Tambah Post Baru.
            </div>
          ) : null}
        </div>
      </SectionCard>
    </div>
  );
}
