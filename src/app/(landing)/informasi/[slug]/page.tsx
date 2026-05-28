import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { initialBlogArticles } from "@/features/landing/blog-data";
import { getBlogPostBySlug } from "@/lib/blog-posts";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export default async function PublicBlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const fallback = initialBlogArticles.find((article) => article.slug === slug);

  let post:
    | {
        title: string;
        slug: string;
        category: string;
        excerpt: string;
        content: string;
        coverImage: string | null;
        publishedAt: Date | null;
        updatedAt: Date;
      }
    | null = null;

  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    post = null;
  }

  if (!post && !fallback) {
    notFound();
  }

  const article = post
    ? {
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        image: post.coverImage ?? "/landing/blog/layanan-pengujian-berkualitas-global-inspeksi-sistem.png",
        date: post.publishedAt ?? post.updatedAt,
      }
    : {
        title: fallback!.title,
        slug: fallback!.slug,
        category: fallback!.category,
        excerpt: fallback!.excerpt,
        content: fallback!.content,
        image: fallback!.image,
        date: new Date(fallback!.date),
      };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative flex min-h-screen items-end overflow-hidden bg-slate-200 px-4 py-16 text-white md:px-8">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/10" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <Link href="/informasi" className="mb-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
            Kembali ke Informasi
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-100">{article.category}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-6xl">{article.title}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-7 rounded-[32px] border border-white/70 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-10">
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-500">
            <span>{formatDate(article.date)}</span>
            <span>/</span>
            <span>GIS Laboratorium</span>
          </div>
          <p className="rounded-3xl bg-slate-50 p-5 text-base leading-8 text-slate-600">{article.excerpt}</p>
          <div className="whitespace-pre-line text-base leading-8 text-slate-700">{article.content}</div>
        </div>
      </article>
    </main>
  );
}
