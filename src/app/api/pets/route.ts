import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;
    const userId = session.user.id;
    const userFirstName = session.user.firstName;
    const userLastName = session.user.lastName;

    let pets;

    if (userRole === "PET_OWNER") {
      // Fetch only pets owned by this user
      pets = await db.pet.findMany({
        where: {
          petOwner: {
            petOwnerUser: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
          petId: true,
          petName: true,
          petSpecies: true,
          petSex: true,
          petBreed: true,
          petAge: true,
          petWeight: true,
          petAvatar: true,
          petOwnerFirstName: true,
          petOwnerLastName: true,
          petOwner: {
            select: {
              petOwnerUser: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      });
    } else if (
      ["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"].includes(userRole)
    ) {
      // Fetch all pets for staff roles
      pets = await db.pet.findMany({
        select: {
          id: true,
          petId: true,
          petName: true,
          petSpecies: true,
          petSex: true,
          petBreed: true,
          petAge: true,
          petWeight: true,
          petAvatar: true,
          petOwnerFirstName: true,
          petOwnerLastName: true,
          petOwner: {
            select: {
              petOwnerUser: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      });
    } else {
      return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });
    }

    return NextResponse.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json(
      { error: "Failed to fetch pets" },
      { status: 500 },
    );
  }
}
