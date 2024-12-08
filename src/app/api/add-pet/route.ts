// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth"; // Use the appropriate method to get session in your setup
// import { authOptions } from "@/lib/auth"; // Update with your NextAuth auth options path
// import { generateId } from "@/src/utils/generateId";
// import db from "@/src/lib/db";

// export async function POST(request: Request) {
//   try {
//     // Get the user session to retrieve the owner ID
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Fetch the petOwnerId from PetOwnerProfile using the user field
//     const userProfile = await db.petOwnerProfile.findUnique({
//       where: {
//         petOwnerId_petOwnerFirstName_petOwnerLastName_petOwnerEmail: {
//           petOwnerId: session.user.id,
//           petOwnerFirstName: session.user.lastName,
//           petOwnerLastName: session.user.firstName,
//           petOwnerEmail: session.user.email,
//         },
//       },
//     });

//     if (!userProfile) {
//       return NextResponse.json(
//         { message: "User profile not found" },
//         { status: 404 },
//       );
//     }

//     const petOwnerId = userProfile.id;

//     // Extract pet data from request
//     const {
//       petName,
//       petSex,
//       petSpecies,
//       petBreed,
//       petAge,
//       petWeight,
//       petColorAndMarkings,
//       birthDate,
//     } = await request.json();

//     console.log("Received data:", {
//       petName,
//       petSex,
//       petSpecies,
//       petBreed,
//       petAge,
//       petWeight,
//       petColorAndMarkings,
//       birthDate,
//       petOwnerId,
//     });

//     // Create pet with the derived petOwnerId
//     const pet = await db.pet.create({
//       data: {
//         petId: parseInt(generateId()),
//         petName,
//         petSex,
//         petSpecies,
//         petBreed,
//         petAge,
//         petWeight,
//         petColorAndMarkings,
//         petBirthdate: birthDate,
//         petOwner: {
//           connect: {
//             id: petOwnerId,
//           },
//         },
//       },
//     });

//     console.log("Pet profile created successfully:", pet);

//     return NextResponse.json(
//       { message: "Pet profile created successfully", pet },
//       { status: 201 },
//     );
//   } catch (error: any) {
//     console.error("Error creating pet profile:", error);
//     return NextResponse.json(
//       { message: "Error creating pet profile", error: error.message },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Use the appropriate method to get session in your setup
import { authOptions } from "@/lib/auth"; // Update with your NextAuth auth options path
import { Resend } from "resend";
import AddPetNotif from "@/components/Emails/AddPetNotif";
import { sendSMS } from "@/utils/semaphore";
import { generateId } from "@/utils/generateId";
import db from "@/src/lib/db";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Get the user session to retrieve the owner ID
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user profile with first and last name
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        petOwnerProfile: true,
        phoneNumber: true,
        email: true,
      },
    });

    if (!user || !user.petOwnerProfile) {
      return NextResponse.json(
        { message: "User profile not found" },
        { status: 404 },
      );
    }

    // Extract pet data from request
    const {
      petName,
      petSex,
      petSpecies,
      petBreed,
      petAge,
      petWeight,
      petColorAndMarkings,
      birthDate,
    } = await request.json();

    console.log("Received data:", {
      petName,
      petSex,
      petSpecies,
      petBreed,
      petAge,
      petWeight,
      petColorAndMarkings,
      birthDate,
    });

    // Create pet with the correct references
    const pet = await db.pet.create({
      data: {
        petId: parseInt(generateId()),
        petName,
        petSex,
        petSpecies,
        petBreed,
        petAge,
        petColorAndMarkings: null,
        petBirthdate: new Date(birthDate),
        petWeight: {
          create: [
            {
              weight: parseFloat(petWeight),
              createdAt: new Date(),
            },
          ],
        },
        petOwner: {
          connect: {
            petOwnerId_petOwnerFirstName_petOwnerLastName_petOwnerEmail: {
              petOwnerId: user.id,
              petOwnerFirstName: user.firstName,
              petOwnerLastName: user.lastName,
              petOwnerEmail: user.email,
            },
          },
        },
      },
      include: {
        petWeight: true, // Include the created weight in response
      },
    });

    // Send notifications
    try {
      // Send SMS if phone number exists
      if (user.phoneNumber) {
        try {
          await sendSMS({
            sendername: process.env.SEMAPHORE_SENDER_NAME!,
            apikey: process.env.SEMAPHORE_API_KEY!,
            number: user.phoneNumber,
            message: `Hello ${user.firstName}, your pet ${petName} has been successfully added to your profile at Abys Agrivet Clinic.`,
          });
        } catch (smsError) {
          console.error("Failed to send SMS:", smsError);
        }
      }

      // Send and log email
      await resend.emails.send({
        from: "Abys Agrivet <noreply@abysagrivet.online>",
        to: user.email,
        subject: "Added a new pet to your profile",
        react: AddPetNotif({
          ownerFirstName: user.firstName,
          petName,
        }),
      });

      await db.emailNotification.create({
        data: {
          userId: user.id,
          recipientEmail: user.email,
          recipientName: `${user.firstName} ${user.lastName}`,
          message: `Pet profile created for ${petName} in ${user.firstName} ${user.lastName} profile`,
          status: "sent",
        },
      });
    } catch (error) {
      // Log failed email attempt
      await db.emailNotification.create({
        data: {
          userId: user.id,
          recipientEmail: user.email,
          recipientName: `${user.firstName} ${user.lastName}`,
          message: `Pet profile created for ${petName} in ${user.firstName} ${user.lastName} profile`,
          status: "failed",
        },
      });
      console.error("Failed to send email:", error);
    }

    return NextResponse.json(
      { message: "Pet profile created successfully", pet },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating pet profile:", error);
    return NextResponse.json(
      { message: "Error creating pet profile", error: error.message },
      { status: 500 },
    );
  }
}
