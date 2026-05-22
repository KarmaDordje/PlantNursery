import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Logowanie",
      credentials: {
        username: { label: "Login", type: "text" },
        password: { label: "Hasło", type: "password" }
      },
      async authorize(credentials) {
        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;

        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPass
        ) {
          return { id: "1", name: "Administrator", email: "admin@szkolka.pl" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  }
};
