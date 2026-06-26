import type { Metadata } from "next";
import { LandingHtmlPage } from "@/features/landing/landing-html-page";
import { landingPagesEn } from "@/features/landing/static-pages-en";

export const metadata: Metadata = {
  title: landingPagesEn.home.title,
  description: landingPagesEn.home.description,
};

export default function EnglishHomeRoute() {
  return <LandingHtmlPage page={landingPagesEn.home} />;
}
