// src/app/api/users/vet-docs/route.ts

import { NextResponse } from "next/server";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vetDoctors = await prisma.user.findMany({
      where: { role: UserRole.VET_DOCTOR },
      select: {
        id: true,
        name: true,
        email: true,
        // Remove specialization if it's not needed or doesn't exist
      },
    });
    return NextResponse.json(vetDoctors, { status: 200 });
  } catch (error) {
    console.error("Error fetching vet doctors:", error);
    return NextResponse.json(
      { error: "Error fetching vet doctors", details: error.message },
      { status: 500 },
    );
  }
}
