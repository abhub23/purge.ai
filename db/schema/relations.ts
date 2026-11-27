import { relations } from "drizzle-orm";
import { account, session, user } from "./auth";
import { plan } from "./application";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  plans: many(plan),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const planRelations = relations(plan, ({ one }) => ({
  user: one(user, {
    fields: [plan.userId],
    references: [user.id],
  }),
}));
