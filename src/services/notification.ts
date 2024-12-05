import { sendSMS } from "@/utils/semaphore";
import { db } from "@/lib/db";

export class NotificationService {
  static async sendAppointmentConfirmation(appointmentId: string) {
    const appointment = await db.onlineConsultationBooking.findUnique({
      where: { id: appointmentId },
      include: {
        petOwner: {
          include: {
            petOwnerUser: true,
          },
        },
      },
    });

    if (!appointment?.petOwner.petOwnerUser.phoneNumber) return;

    await sendSMS({
      apikey: process.env.SEMAPHORE_API_KEY!,
      number: appointment.petOwner.petOwnerUser.phoneNumber,
      message: `Your appointment on ${appointment.date.toLocaleDateString()} at ${appointment.startTime.toLocaleTimeString()} has been confirmed. Join the consultation at: ${appointment.googleMeetLink}`,
    });
  }

  static async sendAppointmentReminder(appointmentId: string) {
    // Similar implementation for reminders
  }

  static async sendPrescriptionNotification(prescriptionId: string) {
    // Implementation for prescription notifications
  }
}
