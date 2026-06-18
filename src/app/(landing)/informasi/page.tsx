import type { Metadata } from "next";

import { InformationPage, type Article } from "@/features/landing/information-page";
import { initialBlogArticles } from "@/features/landing/blog-data";
import { getPublishedBlogPostsForLanding } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artikel - GISLAB",
  description: "Kumpulan artikel dan informasi terbaru dari GIS Laboratorium.",
};

export default function LandingInformationRoute() {
  return <LandingInformationContent />;
}

async function LandingInformationContent() {
  let posts: Article[] = initialBlogArticles;

  try {
    const databasePosts = await getPublishedBlogPostsForLanding();
    posts = databasePosts.length > 0 ? databasePosts : initialBlogArticles;
  } catch {
    posts = initialBlogArticles;
  }

  return <InformationPage initialArticles={posts} />;
}
