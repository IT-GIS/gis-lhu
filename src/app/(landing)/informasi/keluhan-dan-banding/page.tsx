// import type { Metadata } from "next";

// import { ComplaintsAppealsPage } from "@/features/landing/complaints-appeals-page";

// export const metadata: Metadata = {
//   title: "Keluhan dan Banding - GISLAB",
//   description:
//     "Informasi kontak untuk menyampaikan keluhan dan banding kepada PT Global Inspeksi Sistem.",
// };

// export default function ComplaintsAppealsRoute() {
//   return <ComplaintsAppealsPage />;
// }

import { redirect } from "next/navigation";

export default function ComplaintsAppealsRoute() {
  redirect("/informasi");
}