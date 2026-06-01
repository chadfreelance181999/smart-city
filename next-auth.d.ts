import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserModel } from "./app/generated/prisma/models";

declare module "next-auth" {
  interface Session {
    user: {
      userType?: UserModel['userType']; // Add your new field here
    } & DefaultSession["user"];
  }

  interface User {
    userType?: UserModel['userType']; // Matches your database user schema
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType?: UserModel['userType']; // Ensure the token type knows about the field
  }
}