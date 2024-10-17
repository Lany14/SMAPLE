import React from "react";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function PaymentPage() {
  return (
    <>
      <Breadcrumb pageName="Payment Records" />
      <div>PaymentPage</div>
    </>
  );
}
