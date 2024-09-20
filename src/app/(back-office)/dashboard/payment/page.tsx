import React from "react";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
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
