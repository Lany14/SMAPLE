// import { authenticator } from "otplib";
// import { prismaClient } from "@/lib/db";

// export async function generate2FASecret(userId: string) {
//   const secret = authenticator.generateSecret();

//   await prismaClient.user.update({
//     where: { id: userId },
//     data: { twoFactorSecret: secret },
//   });

//   const otpauth = authenticator.keyuri(userId, "ABYS AGRIVET", secret);

//   return { secret, otpauth };
// }

// export async function verify2FAToken(userId: string, token: string) {
//   const user = await prismaClient.user.findUnique({
//     where: { id: userId },
//     select: { twoFactorSecret: true },
//   });

//   if (!user?.twoFactorSecret) return false;

//   return authenticator.verify({
//     token,
//     secret: user.twoFactorSecret,
//   });
// }
