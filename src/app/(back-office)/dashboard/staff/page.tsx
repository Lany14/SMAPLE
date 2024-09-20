import React from "react";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import { NextUIProvider } from "@nextui-org/react";
import StaffTable from "@/components/BackOffice/Tables/StaffTable";

export default function StaffPage() {
  return (
    <>
      <AdminLayout>
        <Breadcrumb pageName="Staff" />
        <NextUIProvider>
          <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
            <StaffTable />
          </div>
        </NextUIProvider>
      </AdminLayout>
    </>
  );
}
