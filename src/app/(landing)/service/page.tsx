import type { Metadata } from "next";

import { ServiceLandingPage } from "@/features/landing/pages";
import { landingPages } from "@/features/landing/static-pages";

export const metadata: Metadata = {
  title: landingPages.service.title,
  description: landingPages.service.description,
};

export default function LandingServiceRoute() {
  return <ServiceLandingPage />;
}
