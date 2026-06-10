import type { Metadata } from "next";

import { ContactPage } from "@/features/landing/contact-page";

export const metadata: Metadata = {
  title: "Kontak - GISLAB",
  description: "Hubungi GIS Laboratorium untuk konsultasi layanan pengujian dan informasi kantor.",
};

export default function LandingContactRoute() {
  return <ContactPage />;
}
