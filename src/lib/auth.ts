import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/db"; // Use this pre-existing instance
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

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
      // profile(profile) {
      //   return {
      //     id: profile.sub,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture,
      //     // You can add custom fields here if needed
      //     firstName: profile.given_name,
      //     lastName: profile.family_name,
      //   }
      // },
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
      // Google sign-in logic
      if (account?.provider === "google" && profile) {
        const generateToken = () => {
          const min = 100000; // Minimum 6-figure number
          const max = 999999; // Maximum 6-figure number
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const userToken = generateToken();
        const existingUser = await prismaClient.user.findUnique({
          where: { email: profile.email },
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              name: profile.name ?? "",
              email: profile.email ?? "",
              image: profile.image ?? null,
              isVerified: true,
              password: null, // Add this line
              token: userToken, // Ensure token is a number
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      const dbUser = await prismaClient.user.findFirst({
        where: { email: token?.email ?? "" },
      });
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.image,
      };
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
