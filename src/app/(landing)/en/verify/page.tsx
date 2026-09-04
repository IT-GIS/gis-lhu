import type { Metadata } from "next";

import { VerificationSearchPageContent } from "@/app/verify/page";

export const metadata: Metadata = {
  title: "LHU Verification - GISLAB",
  description:
    "Verify the authenticity of a GISLAB Laboratory Test Report using an order number, LHU number, or barcode.",
};

export default function EnglishVerificationPage() {
  return <VerificationSearchPageContent language="en" />;
}
