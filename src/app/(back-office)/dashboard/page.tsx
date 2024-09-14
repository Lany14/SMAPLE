import ECommerce from "@/components/BackOffice/Dashboard/VetDashboard";
import { Metadata } from "next";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";
import VetLayout from "@/components/BackOffice/Layouts/VetLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Abys Agrivet | Veterinarian",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <ECommerce />
      </AdminLayout>
    </>
  );
}
