import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/BackOffice/Tables/TableOne";
import TableThree from "@/components/BackOffice/Tables/TableThree";
import TableTwo from "@/components/BackOffice/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";

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
