import TermsOfService from "@/src/components/FrontEnd/Site/Docs/TermsServices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Abys Agrivet",
  description: "This is Terms of Service page for Abys Agrivet Vet Clinic",
  // other metadata
};
export default function PrivacyPolicyPage() {
  return <TermsOfService />;
}
