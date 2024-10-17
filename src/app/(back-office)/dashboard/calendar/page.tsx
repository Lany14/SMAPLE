import { Metadata } from "next";
import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/BackOffice/CalenderBox";

export const metadata: Metadata = {
  title: "AbyVet | Admin",
};

const CalendarPage = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        <CalendarBox />
      </div>
    </>
  );
};

export default CalendarPage;
