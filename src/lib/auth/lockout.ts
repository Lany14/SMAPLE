// import { prismaClient } from "@/lib/db";
// import { addMinutes } from "date-fns";
// import { AuthError } from "../errorHandler";

// const MAX_FAILED_ATTEMPTS = 5;
// const LOCKOUT_DURATION = 15; // minutes

// export async function handleFailedLogin(email: string) {
//   const user = await prismaClient.user.findUnique({
//     where: { email },
//     select: {
//       id: true,
//       failedAttempts: true,
//       lockedUntil: true,
//     },
//   });

//   if (!user) return;

//   const failedAttempts = (user.failedAttempts || 0) + 1;
//   const shouldLock = failedAttempts >= MAX_FAILED_ATTEMPTS;

//   await prismaClient.user.update({
//     where: { id: user.id },
//     data: {
//       failedAttempts,
//       lockedUntil: shouldLock ? addMinutes(new Date(), LOCKOUT_DURATION) : null,
//     },
//   });

//   if (shouldLock) {
//     throw new AuthError(
//       `Account locked. Try again in ${LOCKOUT_DURATION} minutes`,
//       "ACCOUNT_LOCKED",
//       423 // Locked HTTP status
//     );
//   }
// }

// export async function resetFailedAttempts(email: string) {
//   await prismaClient.user.update({
//     where: { email },
//     data: {
//       failedAttempts: 0,
//       lockedUntil: null,
//     },
//   });
// }

// export async function checkAccountLock(email: string) {
//   const user = await prismaClient.user.findUnique({
//     where: { email },
//     select: { lockedUntil: true },
//   });

//   if (user?.lockedUntil && user.lockedUntil > new Date()) {
//     const minutesLeft = Math.ceil(
//       (user.lockedUntil.getTime() - Date.now()) / (1000 * 60),
//     );
//     throw new Error(`Account locked. Try again in ${minutesLeft} minutes`);
//   }
// }
