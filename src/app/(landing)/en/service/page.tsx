import type { Metadata } from "next";
import { LandingHtmlPage } from "@/features/landing/landing-html-page";
import { landingPagesEn } from "@/features/landing/static-pages-en";

export const metadata: Metadata = {
  title: landingPagesEn.service.title,
  description: landingPagesEn.service.description,
};

export default function EnglishServiceRoute() {
  return <LandingHtmlPage page={landingPagesEn.service} />;
}
