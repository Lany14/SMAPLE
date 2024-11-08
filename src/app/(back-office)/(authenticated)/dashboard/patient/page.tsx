import React from "react";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
// import PatientTable from "@/components/BackOffice/Tables/PatientTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function PatientPage() {
  return (
    <>
      <Breadcrumb pageName="Pet Patients" />

      <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        {/* <PatientTable /> */}
      </div>
    </>
  );
}
