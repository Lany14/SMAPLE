"use client";

export const dynamic = "force-dynamic";
export const runtime = "edge";

import AdminDashboard from "@/components/BackOffice/Dashboard/AdminDashboard";
import VetDoctorDashboard from "@/components/BackOffice/Dashboard/VetDoctorDashboard";
import VetNurseDashboard from "@/components/BackOffice/Dashboard/VetNurseDashboard";
import UserDashboard from "@/components/BackOffice/Dashboard/UserDashboard";
import ReceptionistDashboard from "@/components/BackOffice/Dashboard/ReceptionistDashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Loader from "@/components/BackOffice/common/Loader";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (status === "loading" || !isClient) {
    return <Loader />;
  }

  const role = session?.user?.role;

  const renderDashboard = () => {
    switch (role) {
      case "ADMIN":
        return <AdminDashboard />;
      case "DOCTOR":
        return <VetDoctorDashboard />;
      case "NURSE":
        return <VetNurseDashboard />;
      case "RECEPTIONIST":
        return <ReceptionistDashboard />;
      case "PET_OWNER":
        return <UserDashboard />;
    }
  };
  return renderDashboard();
};

export default Dashboard;
