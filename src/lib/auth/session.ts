import { db } from "@/lib/db";
import { logError, logInfo } from "../logger";

export async function cleanupExpiredSessions() {
  try {
    const now = new Date();

    // Use transaction for better reliability
    const result = await db.$transaction(async (tx) => {
      const count = await tx.session.deleteMany({
        where: {
          expires: {
            lt: now,
          },
        },
      });
      return count;
    });

    logInfo("Session cleanup completed", {
      deletedCount: result.count,
      timestamp: now,
    });

    return result.count;
  } catch (error) {
    logError(error as Error, {
      context: "session-cleanup",
      timestamp: new Date(),
    });
    return 0; // Return 0 instead of throwing to prevent worker issues
  }
}

export async function createSession(
  sessionToken: string,
  userId: string,
  expires: Date,
) {
  try {
    const session = await db.session.create({
      data: {
        sessionToken,
        userId,
        expires,
      },
    });
    console.log("Session created:", session);
    return session;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

// Example usage
const sessionToken = "your-session-token";
const userId = "your-user-id";
const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day from now

createSession(sessionToken, userId, expires)
  .then((session) => {
    console.log("Session created successfully:", session);
  })
  .catch((error) => {
    console.error("Failed to create session:", error);
  });
