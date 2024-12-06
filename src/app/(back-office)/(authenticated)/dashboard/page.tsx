import Dashboard from "@/src/components/BackOffice/Dashboard/RenderDashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "AbyVet | Dashboard",
};

function RenderDashboard() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default RenderDashboard;
