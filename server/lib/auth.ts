import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./config";


export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3000'],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    },
  },
});
