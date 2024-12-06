import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createGoogleCalendarEvent } from "@/lib/google"; // Use the Google Calendar helper function

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      console.error("Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;

    // Only Vet Doctor can approve appointments
    if (userRole !== "DOCTOR") {
      return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    const body = await request.json();
    console.log("Request body:", body);
    const { appointmentId } = body;

    if (!appointmentId) {
      console.error("Missing appointment ID.");
      return NextResponse.json(
        { error: "Missing appointment ID" },
        { status: 400 },
      );
    }

    // Fetch the appointment to ensure it exists
    const appointment = await db.onlineConsultationBooking.findUnique({
      where: { id: appointmentId },
      include: {
        // include the email fron user model for petOwner and veterinarian
        veterinarian: {
          select: {
            doctorFirstName: true,
            doctorLastName: true,
            doctorEmail: true,
          }, // Fix email field
        },
        petOwner: {
          select: {
            petOwnerFirstName: true,
            petOwnerLastName: true,
            petOwnerEmail: true,
          }, // Fix email field
        },
        petPatient: { select: { petName: true } },
      },
    });

    // const email= await db.user.findUnique({
    //   where: { id: session.user.id },
    //   select: { email: true },
    // });

    console.log("Fetched appointment:", appointment);

    if (!appointment) {
      console.error("Appointment not found.");
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 },
      );
    }

    // Ensure the appointment belongs to the Vet Doctor approving it
    const vetProfile = await db.doctorProfile.findUnique({
      where: { id: session.user.id },
    });

    if (!vetProfile || vetProfile.id !== appointment.doctorId) {
      return NextResponse.json(
        { error: "Unauthorized action on this appointment" },
        { status: 403 },
      );
    }

    // Update the appointment status to "APPROVED"
    const updatedAppointment = await db.onlineConsultationBooking.update({
      where: { id: appointmentId },
      data: { status: "APPROVED" },
    });

    const eventStartTime = new Date(appointment.startTime); // Use consistent start time
    const eventEndTime = new Date(eventStartTime.getTime() + 3600 * 1000); // Add 1 hour duration
    // Create a single calendar event for both vet doctor and pet owner
    const calendarEvent = await createGoogleCalendarEvent({
      email: appointment.veterinarian?.doctorEmail as string, // Use the vet's account to create the event
      title: `Appointment for ${appointment.petPatient.petName}`,
      description: `Online cosultation for your pet`,
      start: eventStartTime,
      end: eventEndTime,
      timeZone: "Asia/Manila", // Adjust as needed
      attendees: [
        appointment.veterinarian?.doctorEmail as string,
        appointment.petOwner.petOwnerEmail,
      ],
    });

    // Save the Google Meet link to the database
    await db.onlineConsultationBooking.update({
      where: { id: appointmentId },
      data: {
        googleMeetLink: calendarEvent.hangoutLink,
        status: "APPROVED",
      },
    });

    return NextResponse.json({
      message: "Appointment approved and added to calendars",
      appointment: updatedAppointment,
      calendarEvent,
    });
  } catch (error) {
    console.error("Error approving appointment:", error);
    return NextResponse.json(
      {
        error: "Failed to approve appointment",
        details:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
