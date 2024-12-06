"use server";

import { EmailVerification } from "@/components/Emails/EmailVerification";
import { db } from "@/lib/db";
import { generateNumericToken } from "@/src/lib/auth/token";
import { hashPassword } from "@/src/utils/password";
import { SignUpInputProps } from "@/types/credInputs";
import { generateId } from "@/utils/generateId";
import { Resend } from "resend";

export default async function signup(formData: SignUpInputProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, email, password, role } = formData;
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      // throw new Error(`User with this email ( ${email})  already exists in the Database`);
      return {
        data: null,
        error: `User with this email (${email})  already exists in the Database`,
        status: 409,
      };
    }
    // Encrypt the Password =>bcryptjs
    const hashedPassword = await hashPassword(password);
    //Generate Token

    const newUser = await db.user.create({
      data: {
        userId: parseInt(generateId()),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        emailVerificationToken: await generateNumericToken(),
        emailVerificationTokenExpiry: new Date(Date.now() + 300000), // 5 minutes
      },
    });
    if (role === "PET_OWNER") {
      await db.petOwnerProfile.create({
        data: {
          petOwnerId: newUser.id,
          petOwnerFirstName: firstName,
          petOwnerLastName: lastName,
          petOwnerEmail: email,
        },
      });
    }
    //Send an Email with the Token on the link as a search param
    const token = newUser.emailVerificationToken;
    // const name = newUser.firstName.split(" ")[0];
    const linkText = "Verify your Account ";
    const message =
      "Thank you for registering with Abys Agrivet Vet Clinic Portal. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
    const sendMail = await resend.emails.send({
      from: "Abys Agrivet <noreply@abysagrivet.online>",
      to: email,
      subject: "Verify Your Email Address",
      react: EmailVerification({
        firstName,
        token: token ?? 0,
        linkText,
        message,
      }),
    });
    console.log(token);
    console.log(sendMail);
    console.log(newUser);
    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}

export async function getUserById(id: string) {
  if (id) {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function updateUserById(id: string) {
  if (id) {
    try {
      const updatedUser = await db.user.update({
        where: {
          id,
        },
        data: {
          isEmailVerified: true,
          emailVerified: new Date(),
          emailVerificationToken: null,
          emailVerificationTokenExpiry: null,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }
}
