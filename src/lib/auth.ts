// lib/auth.ts

import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { generateId } from "@/utils/generateId";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    // Google Provider for OAuth authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/calendar.readonly",
        },
      },
    }),

    // Credentials provider for manual email/password sign-in
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }

          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            throw new Error("No user found");
          }

          if (!existingUser.password) {
            throw new Error("User password is null");
          }

          const passwordMatch = await compare(
            credentials.password,
            existingUser.password,
          );

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
            picture: existingUser.image,
          };
        } catch (error) {
          console.error("Authorization failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {
        const generateToken = () => {
          const min = 100000;
          const max = 999999;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const generatedUserId = generateId();
        const userToken = generateToken();
        const existingUser = await prismaClient.user.findUnique({
          where: { email: profile.email },
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              userId: parseInt(generatedUserId),
              name: profile.name ?? "",
              email: profile.email ?? "",
              image: profile.image ?? null,
              isVerified: true,
              password: null,
              token: userToken,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      // If the user is signing in for the first time, store access token from Google
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      // Add user id to token for session callback
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      // Include access token in the session for Google Calendar API requests
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.accessToken = token.accessToken; // Add accessToken to session
      }
      return session;
    },
  },
};
