import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");

  if (!doctorId || !date) {
    return NextResponse.json(
      { message: "Doctor ID and date are required" },
      { status: 400 },
    );
  }

  try {
    const dayOfWeek = new Date(date).getDay();

    const schedule = await prisma.doctorSchedule.findFirst({
      where: {
        doctorId: doctorId,
        dayOfWeek: dayOfWeek,
      },
    });

    if (!schedule) {
      return NextResponse.json(
        { message: "No schedule found for this day." },
        { status: 404 },
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        veterinarianId: doctorId,
        date: new Date(date),
      },
      select: { startTime: true, endTime: true },
    });

    const startTime = new Date(schedule.startTime);
    const endTime = new Date(schedule.endTime);
    const slotDuration = 30 * 60 * 1000; // 30 minutes

    let availableSlots: string[] = [];

    for (
      let time = startTime;
      time < endTime;
      time = new Date(time.getTime() + slotDuration)
    ) {
      const isBooked = appointments.some(
        (appointment) =>
          new Date(appointment.startTime).getTime() === time.getTime(),
      );

      if (!isBooked) {
        availableSlots.push(time.toISOString());
      }
    }

    return NextResponse.json({ availableSlots });
  } catch (error: any) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { message: "Error fetching schedule", error: error.message },
      { status: 500 },
    );
  }
}
