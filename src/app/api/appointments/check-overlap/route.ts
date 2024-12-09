import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { doctorId, startTime } = await request.json();

    const start = new Date(startTime);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // Add 30 minutes to the start time

    // Query for overlapping bookings
    const overlappingAppointments = await db.onlineConsultationBooking.findMany(
      {
        where: {
          doctorId: doctorId,
          OR: [
            {
              startTime: { lte: end },
              endTime: { gte: start },
            },
          ],
        },
      },
    );

    const isOverlap = overlappingAppointments.length > 0;
    return NextResponse.json({ isOverlap });
  } catch (error: any) {
    console.error("Error checking for appointment overlap:", error);
    return NextResponse.json(
      { message: "Error checking appointment overlap", error: error.message },
      { status: 500 },
    );
  }
}
