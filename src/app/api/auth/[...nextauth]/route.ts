import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@sethcharlesair.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sethcharles2024";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (
          credentials &&
          credentials.email === ADMIN_EMAIL &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            name: "Admin",
            email: ADMIN_EMAIL,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || "sethcharles-super-secret-key-change-in-production",
});

export { handler as GET, handler as POST };
