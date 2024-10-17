import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import SettingBoxes from "@/components/BackOffice/SettingBoxes";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

const Settings = () => {
  return (
    <>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Settings" />

        <SettingBoxes />
      </div>
    </>
  );
};

export default Settings;
