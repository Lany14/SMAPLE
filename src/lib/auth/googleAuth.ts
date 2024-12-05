import { db } from "@/lib/db";
import { generateId } from "@/utils/generateId";
import { UserRole } from "@prisma/client";

interface GoogleProfile {
  email?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  picture?: string;
}

interface GoogleAccount {
  type: string;
  provider: string;
  providerAccountId: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export async function handleGoogleSignIn(
  account: GoogleAccount,
  profile: GoogleProfile,
) {
  if (!profile.email) {
    throw new Error("No email provided by Google");
  }

  try {
    let user = await db.user.findUnique({
      where: { email: profile.email },
      include: {
        account: true,
        petOwnerProfile: true,
      },
    });

    if (!user) {
      const generatedUserId = await generateId();
      user = await db.user.create({
        data: {
          userId: parseInt(generatedUserId),
          email: profile.email,
          firstName: profile.given_name || profile.name?.split(" ")[0] || "",
          lastName:
            profile.family_name ||
            profile.name?.split(" ").slice(1).join(" ") ||
            "",
          image: profile.picture,
          isEmailVerified: true,
          role: UserRole.PET_OWNER,
          status: "ACTIVE",
        },
        include: {
          account: true,
          petOwnerProfile: true,
        },
      });

      await db.petOwnerProfile.create({
        data: {
          petOwnerId: user.id,
          petOwnerFirstName: user.firstName,
          petOwnerLastName: user.lastName,
        },
      });
    }

    const existingAccount = await db.account.findFirst({
      where: {
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      },
    });

    if (!existingAccount) {
      await db.account.create({
        data: {
          userId: user.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("Error in handleGoogleSignIn:", error);
    throw error;
  }
}
