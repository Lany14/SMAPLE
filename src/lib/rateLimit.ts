// import { LRUCache } from "lru-cache";
// import { securityConfig } from "./security/config";

// const rateLimitCache = new LRUCache({
//   max: 500, // Maximum number of items to store
//   ttl: securityConfig.rateLimiting.windowMs, // Time to live in milliseconds
// });

// export async function rateLimit(
//   identifier: string,
// ): Promise<{ success: boolean; timeLeft?: number }> {
//   try {
//     const attempts = (rateLimitCache.get(identifier) as number) || 0;

//     if (attempts >= securityConfig.rateLimiting.maxAttempts) {
//       return {
//         success: false,
//         timeLeft: securityConfig.rateLimiting.windowMs / 1000,
//       };
//     }

//     rateLimitCache.set(identifier, attempts + 1);
//     return { success: true };
//   } catch (error) {
//     console.error("Rate limit error:", error);
//     return { success: true }; // Fail open
//   }
// }

// export async function resetFailedAttempts(identifier: string) {
//   rateLimitCache.delete(identifier);
// }
