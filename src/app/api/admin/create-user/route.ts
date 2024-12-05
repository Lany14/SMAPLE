import { NextResponse } from "next/server";
import { Resend } from "resend";
import { AccountCreatedEmail } from "@/components/Emails/AccountCreatedEmail";
import { db } from "@/lib/db";
import { generateId } from "@/utils/generateId";
import { generateNumericToken, verifyTokenExpiry } from "@/lib/auth/token";
import { sendSMS } from "@/utils/semaphore";
import { generatePassword, hashPassword } from "@/utils/password";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      sex,
      birthDate,
      age,
      email,
      phoneNumber,
      role,
      licenseNumber,
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate phone number format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 },
      );
    }

    // Check for existing user by email
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        error: `User with email ${email} already exists`,
        status: 409,
      });
    }

    // Validate role
    const validRoles = [
      "ADMIN",
      "RECEPTIONIST",
      "DOCTOR",
      "NURSE",
      "PET_OWNER",
    ];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified" },
        { status: 400 },
      );
    }

    // Validate license number for medical staff
    if ((role === "DOCTOR" || role === "NURSE") && !licenseNumber) {
      return NextResponse.json(
        { error: "License number required for medical staff" },
        { status: 400 },
      );
    }
    // Generate a random password
    const password = generatePassword();
    // Hash the the generated password
    const hashedPassword = await hashPassword(password);
    // Generate a 6 digit Token
    const userToken = await generateNumericToken();
    // const tokenExpiry = await verifyTokenExpiry(new Date());

    // Create user and profile in a transaction
    const result = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          userId: parseInt(generateId()),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phoneNumber: phoneNumber.trim(),
          sex,
          birthDate: birthDate ? new Date(birthDate) : null,
          age: age ? parseInt(age) : null,
          email: email.toLowerCase().trim(),
          role,
          password: hashedPassword,
          emailVerificationToken: userToken,
          emailVerificationTokenExpiry: new Date(
            Date.now() + 1000 * 60 * 60 * 24,
          ),
        },
      });

      try {
        switch (role) {
          case "ADMIN":
            await tx.adminProfile.create({
              data: {
                adminUserId: newUser.id,
                adminFirstName: firstName.trim(),
                adminLastName: lastName.trim(),
              },
            });
            break;
          case "RECEPTIONIST":
            await tx.receptionistProfile.create({
              data: {
                receptionistUserId: newUser.id,
                receptionistFirstName: firstName.trim(),
                receptionistLastName: lastName.trim(),
              },
            });
            break;
          case "DOCTOR":
            await tx.doctorProfile.create({
              data: {
                doctorId: newUser.id,
                doctorFirstName: firstName.trim(),
                doctorLastName: lastName.trim(),
                licenseNumber: licenseNumber.trim(),
              },
            });
            break;
          case "NURSE":
            await tx.nurseProfile.create({
              data: {
                nurseId: newUser.id,
                nurseFirstName: firstName.trim(),
                nurseLastName: lastName.trim(),
                licenseNumber: licenseNumber.trim(),
              },
            });
            break;
          case "PET_OWNER":
            await tx.petOwnerProfile.create({
              data: {
                petOwnerId: newUser.id,
                petOwnerFirstName: firstName.trim(),
                petOwnerLastName: lastName.trim(),
              },
            });
            break;
        }
      } catch (error) {
        // If profile creation fails, the transaction will be rolled back
        throw error;
      }

      return { newUser, password };
    });

    try {
      // Send SMS if phone number exists
      if (phoneNumber) {
        try {
          await sendSMS({
            sendername: process.env.SEMAPHORE_SENDER_NAME!,
            apikey: process.env.SEMAPHORE_API_KEY!,
            number: phoneNumber,
            message: `Dear ${firstName}, Your account has been created in our Clinic Management System. Here
          are your login credentials; Email: ${email} and Password: ${password}`,
          });
        } catch (smsError) {
          console.error("Failed to send SMS:", smsError);
        }
      }
      // Send welcome email
      await resend.emails.send({
        from: "Abys Agrivet <noreply@abysagrivet.online>",
        to: email.toLowerCase().trim(),
        subject: "Welcome to Abys Agrivet",
        react: AccountCreatedEmail({
          firstName: firstName.trim(),
          email: email.toLowerCase().trim(),
          password: result.password,
        }),
      });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Continue with the response even if email fails
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
