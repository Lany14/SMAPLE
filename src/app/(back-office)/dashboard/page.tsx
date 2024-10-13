"use client";

import { Metadata } from "next";
import AdminDashboard from "@/components/BackOffice/Dashboard/AdminDashboard";
import VetDoctorDashboard from "@/components/BackOffice/Dashboard/VetDoctorDashboard";
import VetNurseDashboard from "@/components/BackOffice/Dashboard/VetNurseDashboard";
import UserDashboard from "@/components/BackOffice/Dashboard/UserDashboard";
import ReceptionistDashboard from "@/components/BackOffice/Dashboard/ReceptionistDashboard";
import ECommerce from "@/components/BackOffice/Dashboard/E-commerce";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

// export const metadata: Metadata = {
//   title: "AbyVet | Admin",
// };

const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Handle unauthenticated users (optional)
  // if (status === "unauthenticated") {
  //   router.push("/login"); // Redirect to login or any other page if needed
  //   return null;
  // }

  const role = session?.user?.role;

  const renderDashboard = () => {
    switch (role) {
      case "ADMIN":
        return <AdminDashboard />;
      case "VET_DOCTOR":
        return <VetDoctorDashboard />;
      case "VET_NURSE":
        return <VetNurseDashboard />;
      case "VET_RECEPTIONIST":
        return <ReceptionistDashboard />;
      case "PET_OWNER":
        return <UserDashboard />;
      default:
        return <ECommerce />;
    }
  };

  return <DefaultLayout>{renderDashboard()}</DefaultLayout>;
};

export default Page;
