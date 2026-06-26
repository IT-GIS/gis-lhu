import type { Metadata } from "next";
import { ScopePageEn } from "@/features/landing/scope-page-en";

export const metadata: Metadata = {
  title: "Testing Scope | GIS Laboratory",
  description: "Testing scope and laboratory parameters of GIS Laboratory.",
};

export default function EnglishTestingScopeRoute() {
  return <ScopePageEn />;
}
