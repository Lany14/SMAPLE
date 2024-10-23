import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { generatePassword } from "@/utils/passwordGenerator";
import { AccountCreatedEmail } from "@/components/Emails/AccountCreatedEmail";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

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
    } = req.body;

    // Generate a random password
    const password = generatePassword();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        sex,
        birthDate: new Date(birthDate),
        age: parseInt(age),
        email,
        phoneNumber,
        role,
        licenseNumber,
        specialization,
        password: hashedPassword,
      },
    });

    // Send welcome email with credentials
    await resend.emails.send({
      from: "noreply@yourdomain.com",
      to: email,
      subject: "Welcome to Our Clinic Management System",
      react: AccountCreatedEmail({ firstName, email, password }),
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}
