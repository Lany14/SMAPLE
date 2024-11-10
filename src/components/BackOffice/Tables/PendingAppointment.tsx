// components/BackOffice/Tables/PendingAppointmentsTable.tsx
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

const PendingAppointmentsTable: React.FC = () => {
  // Mock data for demonstration
  const mockAppointments = [
    {
      id: "1",
      petName: "Buddy",
      ownerName: "John Doe",
      appointmentDate: "2024-11-10",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: "2",
      petName: "Max",
      ownerName: "Jane Smith",
      appointmentDate: "2024-11-11",
      time: "2:00 PM",
      status: "Pending",
    },
  ];

  return (
    <Table aria-label="Pending Appointments Table">
      <TableHeader>
        <TableColumn>Pet Name</TableColumn>
        <TableColumn>Owner Name</TableColumn>
        <TableColumn>Appointment Date</TableColumn>
        <TableColumn>Time</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {mockAppointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.petName}</TableCell>
            <TableCell>{appointment.ownerName}</TableCell>
            <TableCell>
              {new Date(appointment.appointmentDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.status}</TableCell>
            <TableCell>
              <Button color="success" auto>
                Approve
              </Button>
              <Button color="error" auto>
                Deny
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PendingAppointmentsTable;
