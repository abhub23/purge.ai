import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../lib/prisma";
import { FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./config";
import { InitialCredits, Week_in_Ms } from "../constants/constants";

export const auth = betterAuth({
  trustedOrigins: [FRONTEND_URL],
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
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.plan.create({
            data: {
              userId: user.id,
              credits: InitialCredits,
              expiresAt: new Date(Date.now() + Week_in_Ms),
            }
          });
        },
      }
    }
  }
});


