import type { Metadata } from "next";
import { ComplaintsAppealsPageEn } from "@/features/landing/complaints-appeals-page-en";

export const metadata: Metadata = {
  title: "Complaints and Appeals | GIS Laboratory",
  description: "Complaints and appeals handling procedure of GIS Laboratory.",
};

export default function EnglishComplaintsAppealsRoute() {
  return <ComplaintsAppealsPageEn />;
}
