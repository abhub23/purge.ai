import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "db";
import * as schema from "db/schema";
import {
  BETTER_AUTH_URL,
  FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  isProd
} from "./config.js";

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  trustedOrigins: [FRONTEND_URL],

  advanced: {
    useSecureCookies: isProd,

    cookies: {
      session_token: {
        name: "better-auth.session_token",
        attributes: {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
        },
      },
      state: {
        attributes: {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
        },
      },
      // session_data: {
      //   name: "better-auth.session_data",
      //   attributes: {
      //     httpOnly: true,
      //     secure: isProd,
      //     sameSite: isProd ? "none" : "lax",
      //   },
      // },
      // dont_remember: {
      //   name: "better-auth.dont_remember",
      //   attributes: {
      //     httpOnly: true,
      //     secure: isProd,
      //     sameSite: isProd ? "none" : "lax",
      //   },
      // },
    },
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },

});
