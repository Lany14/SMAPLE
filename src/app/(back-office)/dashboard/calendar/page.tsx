import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/BackOffice/CalenderBox";
import AdminLayout from "@/components/BackOffice/Layouts/AdminLayout";

const CalendarPage = () => {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        <CalendarBox />
      </div>
    </AdminLayout>
  );
};

export default CalendarPage;
