import type { Metadata } from "next";
import { ContactPageEn } from "@/features/landing/contact-page-en";

export const metadata: Metadata = {
  title: "Contact | GIS Laboratory",
  description: "Contact GIS Laboratory for testing service information.",
};

export default function EnglishContactRoute() {
  return <ContactPageEn />;
}
