import { eq } from "drizzle-orm";
import { db } from "db";
import * as schema from "db/schema";

export async function validateSession(cookieToken: string) {
  const [session] = await db
    .select({
      name: schema.user.name,
      image: schema.user.image,
    })
    .from(schema.session)
    .innerJoin(schema.user, eq(schema.session.userId, schema.user.id))
    .where(eq(schema.session.token, cookieToken))
    .limit(1);

  if (!session?.name) return null;

  return {
    name: session.name.split(' ')[0],
    image: session.image ?? null,
  };
}
