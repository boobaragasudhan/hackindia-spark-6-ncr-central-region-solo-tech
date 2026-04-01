import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth — works when you add real credentials in .env
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // Guest login — always works, no setup needed
    CredentialsProvider({
      id: "guest",
      name: "Guest",
      credentials: {
        name: { label: "Your Name", type: "text", placeholder: "Enter your name" },
      },
      async authorize(credentials) {
        const name = credentials?.name || "Guest User";
        // Find or create a guest user
        let user = await prisma.user.findFirst({
          where: { name, googleId: null },
        });
        if (!user) {
          user = await prisma.user.create({
            data: { name },
          });
        }
        return { id: user.id, name: user.name, email: null, image: null };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        // Upsert user in our database
        const existing = await prisma.user.findUnique({
          where: { googleId: account.providerAccountId },
        });
        if (!existing) {
          await prisma.user.create({
            data: {
              name: user.name || profile.email,
              email: profile.email,
              image: user.image || null,
              googleId: account.providerAccountId,
            },
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.sub) {
        // Look up our internal user by googleId or by the token subject
        let dbUser = await prisma.user.findUnique({
          where: { googleId: token.sub },
        });
        if (!dbUser && session.user?.email) {
          dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
          });
        }
        if (!dbUser) {
          // Guest user — token.sub is the user id itself
          dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
          });
        }
        if (dbUser) {
          (session as any).userId = dbUser.id;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // We handle sign-in inline on the home page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
