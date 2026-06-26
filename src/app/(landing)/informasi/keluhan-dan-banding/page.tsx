import type { Metadata } from "next";

import { ComplaintsAppealsPage } from "@/features/landing/complaints-appeals-page";

export const metadata: Metadata = {
  title: "Keluhan dan Banding - GISLAB",
  description:
    "Skema prosedur penanganan keluhan dan banding pelanggan GIS Laboratorium.",
};

export default function ComplaintsAppealsRoute() {
  return <ComplaintsAppealsPage />;
}
