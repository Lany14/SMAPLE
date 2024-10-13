// import { AuthOptions, NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prismaClient } from "@/lib/db";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import NextAuth from "next-auth";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt", // Using JWT sessions for better performance and scalability
//   },
//   pages: {
//     signIn: "/signin", // Custom sign-in page
//   },

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("No Inputs Found");
//           }

//           // Check if user exists in database
//           const existingUser = await prismaClient.user.findUnique({
//             where: { email: credentials.email },
//           });

//           if (!existingUser) {
//             throw new Error("No user found");
//           }

//           const passwordMatch = await compare(
//             credentials.password,
//             existingUser.password,
//           );

//           if (!passwordMatch) {
//             throw new Error("Password Incorrect");
//           }

//           // Return user object
//           return {
//             id: existingUser.id,
//             firstName: existingUser.firstName,
//             lastName: existingUser.lastName,
//             email: existingUser.email,
//             role: existingUser.role,
//             picture: existingUser.image,
//           };
//         } catch (error) {
//           console.error("Authorization failed", error);
//           throw new Error("Invalid credentials");
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         // On successful login, attach user info to the token
//         token.id = user.id;
//         token.firstName = user.firstName;
//         token.lastName = user.lastName;
//         token.email = user.email;
//         token.role = user.role;
//         token.picture = user.image;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       if (token && session.user) {
//         // Attaching token details to the session object
//         session.user.id = token.id;
//         session.user.firstName = token.firstName;
//         session.user.lastName = token.lastName;
//         session.user.email = token.email;
//         session.user.role = token.role;
//         session.user.image = token.picture;
//       }
//       return session;
//     },
//   },
// };

// import { AuthOptions, NextAuthOptions } from "next-auth";
// // import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prismaClient } from "@/lib/db";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import type { Adapter } from "next-auth/adapters";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import NextAuth from "next-auth";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // more providers at https://next-auth.js.org/providers
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/signin",
//   },

//   providers: [
//     GoogleProvider({
//       // Checking if the role exista and if not add USER Bydefault
//       // profile(profile) {
//       //   return { role: profile.role ?? "USER", ... }
//       // },
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           console.log(
//             "Authorize function called with credentials:",
//             credentials,
//           );
//           // Check if user credentials are Correct
//           if (!credentials?.email || !credentials?.password) {
//             throw { error: "No Inputs Found", status: 401 };
//           }
//           console.log("Pass 1 checked ");
//           //Check if user exists
//           const existingUser = await prismaClient.user.findUnique({
//             where: { email: credentials.email },
//           });

//           if (!existingUser) {
//             console.log("No user found");
//             throw { error: "No user found", status: 404 };
//           }

//           console.log("Pass 2 Checked");
//           console.log(existingUser);
//           let passwordMatch: boolean = false;
//           //Check if Password is correct
//           if (existingUser && existingUser.password) {
//             // if user exists and password exists
//             passwordMatch = await compare(
//               credentials.password,
//               existingUser.password,
//             );
//           }
//           if (!passwordMatch) {
//             console.log("Password incorrect");
//             throw { error: "Password Incorrect", status: 401 };
//           }
//           console.log("Pass 3 Checked");
//           const user = {
//             id: existingUser.id,
//             firstName: existingUser.firstName,
//             lastName: existingUser.lastName,
//             email: existingUser.email,
//             role: existingUser.role,
//             picture: existingUser.image,
//           };
//           //
//           console.log("User Compiled");
//           console.log(user);
//           return user;
//         } catch (error) {
//           console.log("aLL Failed");
//           console.log(error);
//           throw { error: "Something went wrong", status: 401 };
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account && account.provider === "google") {
//         const existingUser = profile ? await prismaClient.user.findUnique({
//           where: { email: profile.email },
//         }) : null;
//         if (!existingUser) {
//           if (profile) {
//             await prismaClient.user.create({
//               data: {
//                 firstName: profile.given_name ?? "Unknown",
//                 lastName: profile.family_name ?? "Unknown",
//                 name: profile.name ?? "Unknown",
//                 email: profile.email ?? "unknown@example.com",
//                 image: profile.picture,
//                 password: "defaultPassword", // You should replace this with a secure password generation logic
//                 token: "defaultToken", // You should replace this with a secure token generation logic
//               },
//             });
//           }
//         }
//       }
//       return true; // Ensure you return true
//     },
//     async jwt({ token, user }) {
//       const dbUser = await prismaClient.user.findFirst({
//         where: { email: token?.email ?? "" },
//       });
//       if (!dbUser) {
//         token.id = user!.id;
//         return token;
//       }
//       return {
//         id: dbUser.id,
//         name: dbUser.name,
//         firstName: dbUser.firstName,
//         lastName: dbUser.lastName,
//         email: dbUser.email,
//         role: dbUser.role,
//         picture: dbUser.image,
//       };
//     },
//     session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.firstName = token.firstName;
//         session.user.lastName = token.lastName;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };

import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/db"; // Use this pre-existing instance
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

// more providers at https://next-auth.js.org/providers
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("No Inputs Found");
          }

          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            throw new Error("No user found");
          }

          const passwordMatch = await compare(
            credentials.password,
            existingUser.password,
          );

          if (!passwordMatch) {
            throw new Error("Password Incorrect");
          }

          return {
            id: existingUser.id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            role: existingUser.role,
            picture: existingUser.image,
          };
        } catch (error) {
          throw new Error("Authorization failed");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account && account.provider === "google" && profile) {
        const existingUser = await prismaClient.user.findUnique({
          where: { email: profile.email },
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              firstName: profile?.given_name ?? "Unknown",
              lastName: profile?.family_name ?? "Unknown",
              name: profile?.name ?? "Unknown",
              email: profile?.email ?? "unknown@example.com",
              image: profile?.picture,
              password: "defaultPassword", // Replace with secure password generation logic
              token: generateSecureToken(), // Replace with secure token generation logic
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
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
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

function generateSecureToken() {
  // Implement secure token generation logic
  return "secureRandomToken";
}
