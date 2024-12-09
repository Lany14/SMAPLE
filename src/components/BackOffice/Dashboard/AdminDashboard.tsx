// "use client";
// import React from "react";
// import ChartThree from "../Charts/ChartThree";
// import AdminDataStatsOne from "../DataStats/AdminDataStatsOne";
// import ClinicRevenueChart from "@/components/BackOffice/Charts/ChartOne";

// const AdminDashboard: React.FC = () => {
//   return (
//     <>
//       AdminDashboard
//       <AdminDataStatsOne />
//       <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
//         <ClinicRevenueChart />
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;

// // mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5

import { BarChart, Users, DollarSign, Activity, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const menuItems = [
//   {
//     label: "Dashboard",
//     href: "/admin",
//     icon: <BarChart className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "User Management",
//     href: "/admin/users",
//     icon: <Users className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Financial Reports",
//     href: "/admin/finance",
//     icon: <DollarSign className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "System Logs",
//     href: "/admin/logs",
//     icon: <Activity className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Settings",
//     href: "/admin/settings",
//     icon: <Settings className="mr-2 h-4 w-4" />,
//   },
// ];

export default function AdminDashboard() {
  return (
    // <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Appointments
          </CardTitle>
          <BarChart className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">567</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,345</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Health</CardTitle>
          <Activity className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98%</div>
        </CardContent>
      </Card>
    </div>
  );
}
