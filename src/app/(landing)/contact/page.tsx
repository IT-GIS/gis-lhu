import type { Metadata } from "next";

import { ContactLandingPage } from "@/features/landing/pages";
import { landingPages } from "@/features/landing/static-pages";

export const metadata: Metadata = {
  title: landingPages.contact.title,
  description: landingPages.contact.description,
};

export default function LandingContactRoute() {
  return <ContactLandingPage />;
}
