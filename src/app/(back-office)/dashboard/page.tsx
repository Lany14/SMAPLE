import { Metadata } from "next";
import VetDashboard from "@/components/BackOffice/Dashboard/VetDoctorDashboard";
import AdminDashboard from "@/components/BackOffice/Dashboard/AdminDashboard";
import React from "react";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import VetDoctorDashboard from "@/components/BackOffice/Dashboard/VetDoctorDashboard";
import VetNurseDashboard from "@/components/BackOffice/Dashboard/VetNurseDashboard";
import UserDashboard from "@/components/BackOffice/Dashboard/UserDashboard";
import ReceptionistDashboard from "@/components/BackOffice/Dashboard/ReceptionistDashboard";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function page() {
  return (
    <>
      <DefaultLayout>
        <AdminDashboard />
        <VetDoctorDashboard />
        <VetNurseDashboard />
        <ReceptionistDashboard />
        <UserDashboard />
      </DefaultLayout>
    </>
  );
}
