import type { Metadata } from "next";

import { ScopeLandingPage } from "@/features/landing/scope-page";

export const metadata: Metadata = {
  title: "Ruang Lingkup Pengujian - GISLAB",
  description: "Daftar ruang lingkup pengujian dan akreditasi GIS Laboratorium.",
};

export default function LandingScopeRoute() {
  return <ScopeLandingPage />;
}
