// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import { adminUsers } from "./db";

// const mockUser = {
//   id: "1",
//   name: "Sandeep Yadav",
//   email: "sandeep@email.com",
//   password: "$2a$12$wvsqQzkOMsLe8syzwXppie.JxL4lrmeO2bvxSyc2peI5kb1GCJLlK", // 'password123'
// };

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const user = adminUsers.find((user) => user.email === email);
        if (!user) {
          return null;
        }

        if (email === user.email && (await compare(password, user.password))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
