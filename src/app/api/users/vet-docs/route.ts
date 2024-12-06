// src/app/api/users/vet-docs/route.ts

import { NextResponse } from "next/server";
import db from "@/src/lib/db";

export async function GET() {
  try {
    const vetDoctors = await db.user.findMany({
      where: { role: "DOCTOR" },
      select: {
        id: true, // This is the correct id field for DoctorSchedule
        firstName: true,
        lastName: true,
        // specialization: true, // Include other fields as necessary
      },
    });

    // Format data to include full name for easier selection in the frontend
    const formattedDoctors = vetDoctors.map((doctor) => ({
      id: doctor.id,
      name: `${doctor.firstName} ${doctor.lastName}`,
      // specialization: doctor.specialization,
    }));

    return NextResponse.json(formattedDoctors, { status: 200 });
  } catch (error) {
    console.error("Error fetching vet doctors:", error);
    return NextResponse.json(
      {
        error: "Error fetching vet doctors",
        details: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
