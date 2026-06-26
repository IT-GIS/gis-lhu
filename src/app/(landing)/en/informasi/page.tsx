import type { Metadata } from "next";

import {
  InformationPageEn,
  type Article,
} from "@/features/landing/information-page-en";
import { initialBlogArticles } from "@/features/landing/blog-data";
import { getPublishedBlogPostsForLanding } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Information - GISLAB",
  description: "Latest articles and information from GIS Laboratory.",
};

export default function EnglishInformationRoute() {
  return <EnglishInformationContent />;
}

async function EnglishInformationContent() {
  let posts: Article[] = initialBlogArticles;

  try {
    const databasePosts = await getPublishedBlogPostsForLanding();
    posts = databasePosts.length > 0 ? databasePosts : initialBlogArticles;
  } catch {
    posts = initialBlogArticles;
  }

  return <InformationPageEn initialArticles={posts} />;
}
