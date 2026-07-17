import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email va parol talab qilinadi");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Email yoki parol notog'ri");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Email yoki parol notog'ri");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          level: user.level,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionExpiresAt: user.subscriptionExpiresAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.level = (user as any).level;
        token.subscriptionPlan = (user as any).subscriptionPlan;
        token.subscriptionStatus = (user as any).subscriptionStatus;
        token.subscriptionExpiresAt = (user as any).subscriptionExpiresAt
          ? (user as any).subscriptionExpiresAt.toISOString?.() || (user as any).subscriptionExpiresAt
          : null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).level = token.level;
        (session.user as any).subscriptionPlan = token.subscriptionPlan;
        (session.user as any).subscriptionStatus = token.subscriptionStatus;
        (session.user as any).subscriptionExpiresAt = token.subscriptionExpiresAt;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
};
