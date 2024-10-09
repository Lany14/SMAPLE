import { Metadata } from "next";
import DefaultLayout from "@/components/BackOffice/Layouts/DefaultLayout";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/BackOffice/CalenderBox";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        <CalendarBox />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
