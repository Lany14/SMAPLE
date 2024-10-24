import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { generatePassword } from "@/utils/passwordGenerator";
import { AccountCreatedEmail } from "@/components/Emails/AccountCreatedEmail";

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
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        sex,
        birthDate: new Date(birthDate),
        age: parseInt(age),
        email,
        phoneNumber,
        role,
        password: hashedPassword,
        token: userToken,
      },
    });

    if (role === "VET_DOCTOR" || role === "VET_NURSE") {
      await prisma.doctorNurseProfile.create({
        data: {
          licenseNumber,
          specialization,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    // Send welcome email with credentials
    await resend.emails.send({
      from: "jhaysonquirao@gmail.com",
      to: email,
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
