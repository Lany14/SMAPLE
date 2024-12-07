import PrivacyPolicy from "@/src/components/FrontEnd/Site/Docs/PrivacyPolicy";
import { NextUIProvider } from "@nextui-org/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Abys Agrivet",
  description: "This is Privacy Policy page for Abys Agrivet Vet Clinic",
  // other metadata
};
export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
