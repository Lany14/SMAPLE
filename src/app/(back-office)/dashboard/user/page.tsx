import React from "react";
import { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import UserTable from "@/components/BackOffice/Tables/UserTable";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};
export default function UserPage() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Pet Parents" />
        <NextUIProvider>
          <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
            <UserTable />
          </div>
        </NextUIProvider>
      </DefaultLayout>
    </>
  );
}
