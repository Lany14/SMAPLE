import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/BackOffice/Tables/TableOne";
import TableThree from "@/components/BackOffice/Tables/TableThree";
import TableTwo from "@/components/BackOffice/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
