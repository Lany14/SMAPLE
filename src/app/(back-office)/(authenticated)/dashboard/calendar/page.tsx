// src/app/(back-office)/(authenticated)/dashboard/calendar/page.tsx

"use client";

import Breadcrumb from "@/components/BackOffice/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import PendingAppointmentsTable from "@/components/BackOffice/Tables/PendingAppointment";

const CalendarPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [pendingAppointments, setPendingAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Google Calendar events
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if (session?.accessToken) {
          const response = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            },
          );
          const data = await response.json();
          const fetchedEvents = data.items.map((event: any) => ({
            title: event.summary || "No title",
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end.dateTime || event.end.date),
          }));
          setEvents(fetchedEvents);
        } else {
          console.error("No access token available.");
        }
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch pending appointments
    const fetchPendingAppointments = async () => {
      try {
        const response = await fetch(
          "/api/appointments/getPendingAppointments",
        );
        const data = await response.json();
        setPendingAppointments(data);
      } catch (error) {
        console.error("Failed to fetch pending appointments:", error);
      }
    };

    fetchEvents();
    fetchPendingAppointments();
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        <h2 className="mt-4 text-lg font-semibold">
          Pending Appointment Approvals
        </h2>
        <PendingAppointmentsTable appointments={pendingAppointments} />

        <h1 className="mb-4 mt-8 text-xl font-bold">Google Calendar Events</h1>

        <div className="custom-calendar-container mt-4">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=mrlegaspina%40ccc.edu.ph&ctz=UTC"
            style={{
              border: 0,
              width: "100%",
              height: "600px",
            }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
