// src/app/api/appointments/getPendingAppointments.ts

import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@/lib/db"; // Adjust the path if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const pendingAppointments = await prismaClient.appointment.findMany({
        where: {
          status: "SCHEDULED", // Adjust this based on your AppointmentStatus enum
        },
        include: {
          petOwner: {
            select: { firstName: true, lastName: true },
          },
          pet: {
            select: { petName: true },
          },
        },
      });

      res.status(200).json(pendingAppointments);
    } catch (error) {
      console.error("Error fetching pending appointments:", error);
      res.status(500).json({ error: "Failed to fetch pending appointments" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
