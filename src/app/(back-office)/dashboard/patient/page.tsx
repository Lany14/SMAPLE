import React from "react";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import PatientTable from "@/components/BackOffice/Tables/PatientTable";
import { NextUIProvider } from "@nextui-org/react";
import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

export default function PatientPage() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Patients" />
        <NextUIProvider>
          <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
            <PatientTable />
          </div>
        </NextUIProvider>
      </DefaultLayout>
    </>
  );
}
