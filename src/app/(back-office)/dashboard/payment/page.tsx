import React from "react";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function PaymentPage() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Payment Records" />
        <div>PaymentPage</div>
      </DefaultLayout>
    </>
  );
}
