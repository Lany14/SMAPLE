import AddPetForm from "@/components/BackOffice/AddPetForm";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import React from "react";

const AddPetRecordPage: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Add Pet Record" />
      <AddPetForm />
    </>
  );
};

export default AddPetRecordPage;
