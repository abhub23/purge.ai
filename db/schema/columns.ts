import { timestamp } from "drizzle-orm/pg-core";

export const dateTime = (name: string) =>
  timestamp(name, { precision: 3, withTimezone: false, mode: "date" });
