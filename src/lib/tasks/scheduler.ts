// import { cleanupExpiredSessions } from "../auth/session";

// export async function setupCleanupTasks() {
//   // Run cleanup every 24 hours
//   setInterval(
//     async () => {
//       try {
//         await cleanupExpiredSessions();
//         console.log("Session cleanup completed");
//       } catch (error) {
//         console.error("Session cleanup failed:", error);
//       }
//     },
//     24 * 60 * 60 * 1000,
//   ); // 24 hours
// }
