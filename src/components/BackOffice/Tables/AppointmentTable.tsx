"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface Appointment {
  id: string;
  date: string;
  startTime: string;
  status: string;
  pet: {
    petName: string;
  };
  veterinarian: {
    firstName: string;
    lastName: string;
  };
  petOwner?: {
    firstName: string;
    lastName: string;
  };
}

interface AppointmentTableProps {
  appointments: Appointment[]; // Accept appointments as a prop
}

export default function AppointmentTable({
  appointments,
}: AppointmentTableProps) {
  return (
    <div className="appointment-table-container">
      <h2>My Appointments</h2>
      <Table
        aria-label="Appointments Table"
        css={{ height: "auto", minWidth: "100%" }}
      >
        <TableHeader>
          <TableColumn>Pet Owner</TableColumn>
          <TableColumn>Doctor</TableColumn>
          <TableColumn>Pet</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No appointments found">
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                {appointment.petOwner
                  ? `${appointment.petOwner.firstName || "N/A"} ${
                      appointment.petOwner.lastName || "N/A"
                    }`
                  : "N/A"}
              </TableCell>
              <TableCell>
                {appointment.veterinarian
                  ? `${appointment.veterinarian.firstName || "N/A"} ${
                      appointment.veterinarian.lastName || "N/A"
                    }`
                  : "N/A"}
              </TableCell>
              <TableCell>{appointment.pet?.petName || "N/A"}</TableCell>
              <TableCell>
                {appointment.date
                  ? new Date(appointment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "Invalid Date"}
              </TableCell>
              <TableCell>
                {appointment.startTime
                  ? new Date(appointment.startTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )
                  : "Invalid Time"}
              </TableCell>
              <TableCell>{appointment.status || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
