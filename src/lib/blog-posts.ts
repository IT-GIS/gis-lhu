import { BlogPostStatus, type Prisma } from "@prisma/client";

import type { AuthUser } from "@/lib/auth";
import { recordAudit } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { canManageBlogPosts } from "@/lib/permissions";
import { blogPostSchema, updateBlogPostSchema } from "@/lib/validators";
import { initialBlogArticles } from "@/features/landing/blog-data";

type LandingArticle = {
  id: number;
  title: string;
  slug: string;
  date: string;
  category: string;
  image: string;
  sourceUrl: string;
  excerpt: string;
};

const defaultCoverImage = "/landing/blog/layanan-pengujian-berkualitas-global-inspeksi-sistem.png";

export const blogPostStatusLabels: Record<BlogPostStatus, string> = {
  draft: "Draft",
  published: "Published",
};

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function parsePublishedAt(status: BlogPostStatus, value?: string | null) {
  if (status === "draft") return null;
  if (!value) return new Date();

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function toNullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapPostToArticle(post: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  sourceUrl: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
}): LandingArticle {
  return {
    id: Number.parseInt(post.id.replace(/\D/g, "").slice(-8), 10) || post.updatedAt.getTime(),
    title: post.title,
    slug: post.slug,
    date: (post.publishedAt ?? post.updatedAt).toISOString(),
    category: post.category,
    image: post.coverImage ?? defaultCoverImage,
    sourceUrl: post.sourceUrl ?? `/informasi/${post.slug}`,
    excerpt: post.excerpt,
  };
}

async function ensureInitialBlogPosts() {
  for (const article of initialBlogArticles) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: article.slug },
      select: { id: true, content: true },
    });

    if (!existing) {
      await prisma.blogPost.create({
        data: {
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          coverImage: article.image,
          sourceUrl: article.sourceUrl,
          status: BlogPostStatus.published,
          publishedAt: new Date(article.date),
        },
      });

      continue;
    }

    const looksLikeImportedExcerpt = existing.content === article.excerpt;

    if (looksLikeImportedExcerpt) {
      await prisma.blogPost.update({
        where: { id: existing.id },
        data: {
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          coverImage: article.image,
          sourceUrl: article.sourceUrl,
          status: BlogPostStatus.published,
          publishedAt: new Date(article.date),
        },
      });
    }
  }
}

export async function getBlogPosts() {
  await ensureInitialBlogPosts();

  return prisma.blogPost.findMany({
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    include: {
      creator: { select: { name: true } },
      updater: { select: { name: true } },
    },
  });
}

export async function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      creator: { select: { name: true } },
      updater: { select: { name: true } },
    },
  });
}

export async function getBlogPostBySlug(slug: string) {
  await ensureInitialBlogPosts();

  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: BlogPostStatus.published,
    },
  });
}

export async function getPublishedBlogPostsForLanding() {
  await ensureInitialBlogPosts();

  const posts = await prisma.blogPost.findMany({
    where: { status: BlogPostStatus.published },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
  });

  return posts.map(mapPostToArticle);
}

export async function createBlogPost(actor: AuthUser, input: Record<string, string>) {
  if (!canManageBlogPosts(actor.role)) {
    throw new Error("Hanya admin yang dapat membuat post.");
  }

  const parsed = blogPostSchema.parse(input);
  const status = parsed.status as BlogPostStatus;
  const publishedAt = parsePublishedAt(status, parsed.publishedAt);

  return prisma.$transaction(async (tx) => {
    const post = await tx.blogPost.create({
      data: {
        title: parsed.title,
        slug: parsed.slug,
        category: parsed.category,
        excerpt: parsed.excerpt,
        content: parsed.content,
        coverImage: toNullable(parsed.coverImage),
        sourceUrl: toNullable(parsed.sourceUrl),
        status,
        publishedAt,
        createdById: actor.id,
        updatedById: actor.id,
      },
    });

    await recordAudit(tx, {
      actorId: actor.id,
      action: "blog_post.create",
      entityType: "blog_post",
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug } satisfies Prisma.InputJsonObject,
    });

    return post;
  });
}

export async function updateBlogPost(actor: AuthUser, input: Record<string, string>) {
  if (!canManageBlogPosts(actor.role)) {
    throw new Error("Hanya admin yang dapat mengubah post.");
  }

  const parsed = updateBlogPostSchema.parse(input);
  const status = parsed.status as BlogPostStatus;
  const publishedAt = parsePublishedAt(status, parsed.publishedAt);

  return prisma.$transaction(async (tx) => {
    const post = await tx.blogPost.update({
      where: { id: parsed.postId },
      data: {
        title: parsed.title,
        slug: parsed.slug,
        category: parsed.category,
        excerpt: parsed.excerpt,
        content: parsed.content,
        coverImage: toNullable(parsed.coverImage),
        sourceUrl: toNullable(parsed.sourceUrl),
        status,
        publishedAt,
        updatedById: actor.id,
      },
    });

    await recordAudit(tx, {
      actorId: actor.id,
      action: "blog_post.update",
      entityType: "blog_post",
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug, status: post.status } satisfies Prisma.InputJsonObject,
    });

    return post;
  });
}
