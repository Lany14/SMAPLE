import crypto from "crypto";

// Generate Secure Token for Password Reset
export async function generateSecureToken(
  length: number = 32,
): Promise<string> {
  return crypto.randomBytes(length).toString("hex");
}

// Generate Numeric Token for Password Reset
export async function generateNumericToken(): Promise<number> {
  const buffer = crypto.randomBytes(4);
  // Generate a 6-digit number
  return (parseInt(buffer.toString("hex"), 16) % 900000) + 100000;
}

// Verify Token Expiry
export async function verifyTokenExpiry(
  tokenExpiry: Date | null,
): Promise<boolean> {
  if (!tokenExpiry) return false;
  return tokenExpiry > new Date();
}
