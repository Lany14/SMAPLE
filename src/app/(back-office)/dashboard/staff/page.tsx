import React from "react";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import { NextUIProvider } from "@nextui-org/react";
import StaffTable from "@/components/BackOffice/Tables/StaffTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function StaffPage() {
  return (
    <>
      <Breadcrumb pageName="Clinic Staff" />
      <NextUIProvider>
        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <StaffTable />
        </div>
      </NextUIProvider>
    </>
  );
}
