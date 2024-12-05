export const securityConfig = {
  passwords: {
    minLength: 12,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    saltRounds: 12,
  },
  tokens: {
    accessTokenExpiry: "15m",
    refreshTokenExpiry: "7d",
    resetTokenExpiry: "1h",
    verificationTokenExpiry: "24h",
  },
  rateLimiting: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDuration: 15 * 60 * 1000, // 15 minutes
  },
  lockout: {
    maxAttempts: 5,
    durationMinutes: 15,
    progressiveMultiplier: 2, // Optional: increase lockout duration with repeated violations
  }
};
