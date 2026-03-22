import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const res = await userLogIn(credentials.email, credentials.password);
        if (res.success) {
          return { ...res.data, token: res.token };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token._id = u._id;
        token.name = u.name;
        token.email = u.email;
        token.tel = u.tel;
        token.role = u.role;
        token.token = u.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.tel = token.tel;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
};