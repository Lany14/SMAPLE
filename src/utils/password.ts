import { hash, compare } from "bcryptjs";
import { securityConfig } from "@/lib/security/config";

export function hashPassword(password: string) {
  return hash(password, securityConfig.passwords.saltRounds);
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
) {
  return await compare(plainPassword, hashedPassword);
}

export function generatePassword(length = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}
