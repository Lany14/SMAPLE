import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import crypto from "crypto";
import { ResetPasswordEmail } from "@/src/components/Emails/ResetPassword";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 },
      );
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 300000); // 5 minutes from now

    // Update user with reset token and expiry
    await db.user.update({
      where: { email },
      data: {
        pwResetToken: resetToken,
        pwResetTokenExpiry: resetTokenExpiry,
      },
    });

    // Create reset password link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    // Send email
    await resend.emails.send({
      from: "Abys Agrivet <noreply@abysagrivet.online>",
      to: email,
      subject: "Reset Your Password",
      react: ResetPasswordEmail({
        firstName: user.firstName,
        resetLink,
      }),
    });

    return NextResponse.json({
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset" },
      { status: 500 },
    );
  }
}
