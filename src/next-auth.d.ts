import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      tel: string;
      role: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    tel: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    tel: string;
    role: string;
    token: string;
  }
}