import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema });
const userId = "seed-user-001";
const now = new Date();
const inThirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

try {
  await db.transaction(async (tx) => {
    await tx
      .insert(schema.user)
      .values({
        id: userId,
        name: "Local Seed User",
        email: "seed.user@purgeai.local",
        emailVerified: true,
        image: null,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing();

    const [seedUser] = await tx
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(eq(schema.user.id, userId));

    if (!seedUser) {
      throw new Error(
        "Could not create seed user; the seed email may already belong to another user.",
      );
    }

    await tx
      .insert(schema.session)
      .values({
        id: "seed-session-001",
        expiresAt: inThirtyDays,
        token: "seed-session-token-001",
        createdAt: now,
        updatedAt: now,
        ipAddress: "192.0.2.1",
        userAgent: "PurgeAI local seed",
        userId,
      })
      .onConflictDoNothing();

    await tx
      .insert(schema.account)
      .values({
        id: "seed-account-001",
        accountId: userId,
        providerId: "credential",
        userId,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing();

    await tx
      .insert(schema.verification)
      .values({
        id: "seed-verification-001",
        identifier: "seed.user@purgeai.local",
        value: "local-seed-verification",
        expiresAt: inThirtyDays,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing();

  });

  console.log("Seed data inserted or already present in Better Auth tables.");
} finally {
  await pool.end();
}
