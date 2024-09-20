import { Metadata } from "next";
import VetDashboard from "@/components/BackOffice/Dashboard/VetDashboard";
import AdminDashboard from "@/components/BackOffice/Dashboard/AdminDashboard";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";
import VetLayout from "@/components/BackOffice/Layouts/VetLayout";
import React from "react";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function page() {
  return (
    <>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </>
  );
}
