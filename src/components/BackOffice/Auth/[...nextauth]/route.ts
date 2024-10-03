import { AuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";

export const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {},
    }),
  ],
};
