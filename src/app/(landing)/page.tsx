import type { Metadata } from "next";
import { LandingHtmlPage } from "@/features/landing/landing-html-page";
import { landingPages } from "@/features/landing/static-pages";

export const metadata: Metadata = {
  title: landingPages.home.title,
  description: landingPages.home.description,
};

export default function HomeRoute() {
  return <LandingHtmlPage page={landingPages.home} />;
}
