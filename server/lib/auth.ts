import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../lib/prisma";
import { FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./config";

const Week_in_Ms = 7 * 24 * 60 * 60 * 1000
const Creds = 5

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
              credits: 5,
              expiresAt: new Date(Date.now() + Week_in_Ms),
            }
          });
        },
      }
    }
  }
});


