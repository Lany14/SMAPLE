import { EmailVerification } from "@/components/Emails/EmailVerification";
import { getUserByEmail } from "@/data/user";
import { generateNumericToken } from "@/lib/auth/token";
import { db } from "@/lib/db";
import { SignUpInputProps } from "@/types/credInputs";
import { generateId } from "@/utils/generateId";
import { hashPassword } from "@/utils/password";
import { Resend } from "resend";

export default async function signup(formData: SignUpInputProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, email, password, role } = formData;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      // throw new Error(`User with this email ( ${email})  already exists in the Database`);
      return {
        data: null,
        error: `User with this email (${email})  already exists in the Database`,
        status: 409,
      };
    }
    // Encrypt the Password
    const hashedPassword = await hashPassword(password);
    // Generate a unique userId
    const generatedUserId = generateId();
    // Generate a 6 digit Token
    const userToken = await generateNumericToken();
    // Create a new User
    const newUser = await db.user.create({
      data: {
        userId: parseInt(generatedUserId),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        emailVerificationToken: userToken,
        emailVerificationTokenExpiry: new Date(
          Date.now() + 1000 * 60 * 60 * 24,
        ),
      },
    });

    // Create PetOwnerProfile if role is PET_OWNER
    if (role === "PET_OWNER") {
      await db.petOwnerProfile.create({
        data: {
          petOwnerId: newUser.id,
          petOwnerFirstName: firstName,
          petOwnerLastName: lastName,
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
          status: "ACTIVE",
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
