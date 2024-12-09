import { Calendar, DollarSign, Users, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const menuItems = [
//   {
//     label: "Dashboard",
//     href: "/receptionist",
//     icon: <Calendar className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Appointments",
//     href: "/receptionist/appointments",
//     icon: <Calendar className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Billing",
//     href: "/receptionist/billing",
//     icon: <DollarSign className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Pet Owners",
//     href: "/receptionist/pet-owners",
//     icon: <Users className="mr-2 h-4 w-4" />,
//   },
// ];

export default function ReceptionistDashboard() {
  return (
    // <h1 className="text-2xl font-bold mb-4">Receptionist Dashboard</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            Pending Payments
          </CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            New Registrations
          </CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <MessageSquare className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
    </div>
  );
}
