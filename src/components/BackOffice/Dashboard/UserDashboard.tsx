import {
  PawPrintIcon as Paw,
  Calendar,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const menuItems = [
//   {
//     label: "Dashboard",
//     href: "/pet-owner",
//     icon: <Paw className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "My Pets",
//     href: "/pet-owner/pets",
//     icon: <Paw className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Appointments",
//     href: "/pet-owner/appointments",
//     icon: <Calendar className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Billing",
//     href: "/pet-owner/billing",
//     icon: <CreditCard className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Messages",
//     href: "/pet-owner/messages",
//     icon: <MessageCircle className="mr-2 h-4 w-4" />,
//   },
// ];

export default function PetOwnerDashboard() {
  return (
    // <h1 className="mb-4 text-2xl font-bold">Pet Owner Dashboard</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Pets</CardTitle>
          <Paw className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Appointments
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
          <CreditCard className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          <MessageCircle className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
    </div>
  );
}
