import {
  boolean,
  foreignKey,
  pgTable,
  text,
  unique,
} from "drizzle-orm/pg-core";
import { dateTime } from "./columns";

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: dateTime("createdAt").notNull(),
    updatedAt: dateTime("updatedAt").notNull(),
  },
  (table) => [unique("user_email_key").on(table.email)],
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: dateTime("expiresAt").notNull(),
    token: text("token").notNull(),
    createdAt: dateTime("createdAt").notNull(),
    updatedAt: dateTime("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull(),
  },
  (table) => [
    unique("session_token_key").on(table.token),
    foreignKey({
      name: "session_userId_fkey",
      columns: [table.userId],
      foreignColumns: [user.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId").notNull(),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: dateTime("accessTokenExpiresAt"),
    refreshTokenExpiresAt: dateTime("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: dateTime("createdAt").notNull(),
    updatedAt: dateTime("updatedAt").notNull(),
  },
  (table) => [
    foreignKey({
      name: "account_userId_fkey",
      columns: [table.userId],
      foreignColumns: [user.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: dateTime("expiresAt").notNull(),
  createdAt: dateTime("createdAt"),
  updatedAt: dateTime("updatedAt"),
});
