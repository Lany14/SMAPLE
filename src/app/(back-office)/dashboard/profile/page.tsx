import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";
import ProfileBox from "@/components/BackOffice/ProfileBox";

const Profile = () => {
  return (
    <AdminLayout>
      <Breadcrumb pageName="Profile" />
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Profile" />
        <ProfileBox />
      </div>
    </AdminLayout>
  );
};

export default Profile;
