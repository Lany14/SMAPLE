import {
  Calendar,
  FileText,
  Stethoscope,
  MessageCircle,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const menuItems = [
//   {
//     label: "Dashboard",
//     href: "/doctor",
//     icon: <Stethoscope className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Patient Records",
//     href: "/doctor/records",
//     icon: <FileText className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Appointments",
//     href: "/doctor/appointments",
//     icon: <Calendar className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Prescriptions",
//     href: "/doctor/prescriptions",
//     icon: <FileText className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Communication",
//     href: "/doctor/communication",
//     icon: <MessageCircle className="mr-2 h-4 w-4" />,
//   },
// ];

export default function DoctorDashboard() {
  return (
    // <h1 className="mb-4 text-2xl font-bold">Doctor Dashboard</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today's Appointments
          </CardTitle>
          <Calendar className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Consultations
          </CardTitle>
          <Stethoscope className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Virtual Consultations
          </CardTitle>
          <Video className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
    </div>
  );
}
