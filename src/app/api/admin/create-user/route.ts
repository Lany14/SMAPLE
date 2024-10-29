import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { generatePassword } from "@/utils/passwordGenerator";
import { AccountCreatedEmail } from "@/components/Emails/AccountCreatedEmail";
import { generateId } from "@/utils/generateId";

const prisma = new PrismaClient();
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
      specialization,
    } = await request.json();

    // Generate a random password
    const password = generatePassword();

    const generatedUserId = generateId();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        userId: generatedUserId,
        name: `${firstName} ${lastName}`,
        email,
        role,
        password: hashedPassword,
        token: userToken,
      },
    });

    if (role === "VET_DOCTOR" || role === "VET_NURSE") {
      await prisma.doctorNurseProfile.create({
        data: {
          firstName,
          lastName,
          sex,
          birthDate: new Date(birthDate),
          age: parseInt(age),
          phoneNumber,
          licenseNumber,
          specialization,
          user: {
            connect: {
              userId: user.userId,
            },
          },
        },
      });
    }
    if (role === "VET_RECEPTIONIST") {
      await prisma.receptionistProfile.create({
        data: {
          firstName,
          lastName,
          sex,
          birthDate: new Date(birthDate),
          age: parseInt(age),
          phoneNumber,
          user: {
            connect: {
              userId: user.userId,
            },
          },
        },
      });
    }

    // Send welcome email with credentials
    await resend.emails.send({
      from: "Abys Agrivet <onboarding@resend.dev>",
      to: "jhaysonquirao@gmail.com",
      subject: "Welcome to Abys Agrivet",
      react: AccountCreatedEmail({ firstName, email, password }),
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 },
    );
  }
}
