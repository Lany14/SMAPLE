import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import SettingBoxes from "@/components/BackOffice/SettingBoxes";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

const Settings = () => {
  return (
    <AdminLayout>
      <Breadcrumb pageName="Setting" />
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Settings" />

        <SettingBoxes />
      </div>
    </AdminLayout>
  );
};

export default Settings;
