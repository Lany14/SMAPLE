import { OnlineConsultationBooking } from "@prisma/client";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

export const createMeetingAndCalendarEvent = async (
  consultation: OnlineConsultationBooking,
  accessToken: string,
) => {
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  // Create Google Meet conference
  const event = {
    summary: `Pet Consultation: ${consultation.petName}`,
    description: `Online consultation for ${consultation.petName} with Dr. ${consultation.doctorLastName}`,
    start: {
      dateTime: consultation.startTime.toISOString(),
      timeZone: "Asia/Manila",
    },
    end: {
      dateTime: consultation.endTime.toISOString(),
      timeZone: "Asia/Manila",
    },
    attendees: [
      { email: consultation.petOwner.email },
      { email: consultation.doctorUser.email },
    ],
    conferenceData: {
      createRequest: {
        requestId: consultation.id,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: event,
  });

  return {
    meetLink: response.data.conferenceData?.entryPoints?.[0].uri,
    eventId: response.data.id,
  };
};
