import React from "react";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function PaymentPage() {
  return (
    <>
      <AdminLayout>
        <Breadcrumb pageName="Payment Records" />
        <div>PaymentPage</div>
      </AdminLayout>
    </>
  );
}
