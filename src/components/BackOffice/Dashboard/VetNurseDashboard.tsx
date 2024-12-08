import {
  Clipboard,
  Syringe,
  Package,
  FlaskRoundIcon as Flask,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const menuItems = [
//   {
//     label: "Dashboard",
//     href: "/nurse",
//     icon: <Clipboard className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Patient Prep",
//     href: "/nurse/prep",
//     icon: <Syringe className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Inventory",
//     href: "/nurse/inventory",
//     icon: <Package className="mr-2 h-4 w-4" />,
//   },
//   {
//     label: "Lab Results",
//     href: "/nurse/lab",
//     icon: <Flask className="mr-2 h-4 w-4" />,
//   },
// ];

export default function NurseDashboard() {
  return (
    // <h1 className="mb-4 text-2xl font-bold">Nurse Dashboard</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Tasks</CardTitle>
          <Clipboard className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Patients in Queue
          </CardTitle>
          <Syringe className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <Package className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
    </div>
  );
}
