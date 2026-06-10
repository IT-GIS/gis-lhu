import type { Metadata } from "next";

import { ProfileLandingPage } from "@/features/landing/pages";
import { landingPages } from "@/features/landing/static-pages";

export const metadata: Metadata = {
  title: landingPages.profile.title,
  description: landingPages.profile.description,
};

export default function LandingProfileRoute() {
  return <ProfileLandingPage />;
}
