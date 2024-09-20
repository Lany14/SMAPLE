import BasicChart from "@/components/BackOffice/Charts/BasicChart";
import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import React from "react";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Basic Chart" />

      <BasicChart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
