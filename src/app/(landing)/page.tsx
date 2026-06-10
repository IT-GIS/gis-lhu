import type { Metadata } from "next";

import { HomeLandingPage } from "@/features/landing/pages";
import { landingPages } from "@/features/landing/static-pages";

export const metadata: Metadata = {
  title: landingPages.home.title,
  description: landingPages.home.description,
};

export default function LandingHomeRoute() {
  return <HomeLandingPage />;
}
