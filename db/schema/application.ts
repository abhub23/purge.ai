import { sql } from "drizzle-orm";
import {
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { dateTime } from "./columns";
import { user } from "./auth";

export const planType = pgEnum("PlanType", ["free", "pro", "custom"]);

export const tempUsers = pgTable(
  "temp_users",
  {
    id: text("id").primaryKey(),
    ipAddress: text("ipAddress").notNull(),
    expiresAt: dateTime("expiresAt").notNull(),
    createdAt: dateTime("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    credits: integer("credits").notNull().default(5),
  },
  (table) => [index("temp_users_ipAddress_idx").on(table.ipAddress)],
);

export const plan = pgTable(
  "plan",
  {
    id: text("id").primaryKey(),
    type: planType("type").notNull().default("free"),
    credits: integer("credits").notNull().default(20),
    expiresAt: dateTime("expiresAt").notNull(),
    createdAt: dateTime("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    userId: text("userId").notNull(),
  },
  (table) => [
    foreignKey({
      name: "plan_userId_fkey",
      columns: [table.userId],
      foreignColumns: [user.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);
