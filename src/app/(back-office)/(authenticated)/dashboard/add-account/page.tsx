import AddClinicStaff from "@/components/BackOffice/AddClinicStaff";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import React from "react";

export default function AddAccountPage() {
  return (
    <>
      <Breadcrumb pageName="Add Account" />
      <AddClinicStaff />
    </>
  );
}
