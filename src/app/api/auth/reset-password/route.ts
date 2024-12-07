import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";
import { ResetPasswordSuccessEmail } from "@/components/Emails/ResetPassword";
import { sendSMS } from "@/utils/semaphore";
import { hashPassword } from "@/src/utils/password";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body); // Debug log

    const { password, pwResetToken } = body;
    console.log("Extracted values:", { password, pwResetToken }); // Debug log

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Add validation for required fields and password strength
    if (!password || !pwResetToken) {
      console.log("Missing required fields:", { password, pwResetToken }); // Debug log
      return NextResponse.json(
        { error: "Password and token are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    }

    const user = await db.user.findFirst({
      where: {
        pwResetToken: pwResetToken,
        pwResetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 },
      );
    }
    const hashedPassword = await hashPassword(password);

    try {
      await db.$transaction([
        db.user.update({
          where: { id: user.id },
          data: {
            password: hashedPassword,
            pwResetToken: null,
            pwResetTokenExpiry: null,
            failedAttempts: 0,
            lockedUntil: null,
          },
        }),
        db.session.deleteMany({
          where: { userId: user.id },
        }),
      ]);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to update password in database" },
        { status: 500 },
      );
    }

    try {
      // Send SMS if phone number exists
      if (user.phoneNumber) {
        try {
          await sendSMS({
            sendername: process.env.SEMAPHORE_SENDER_NAME!,
            apikey: process.env.SEMAPHORE_API_KEY!,
            number: user.phoneNumber,
            message: `Dear ${user.firstName}, Your password has been successfully reset`,
          });
        } catch (smsError) {
          console.error("Failed to send SMS:", smsError);
        }
      }
      // Send email
      await resend.emails.send({
        from: "Abys Agrivet <noreply@abysagrivet.online>",
        to: user.email,
        subject: "Password reset successful",
        react: ResetPasswordSuccessEmail({
          firstName: user.firstName,
        }),
      });

      console.error("Failed to send email");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue execution even if email fails
    }

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 },
    );
  }
}
