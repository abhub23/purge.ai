import { and, eq, gt } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import { db } from "db";
import * as schema from "db/schema";
import { isProd } from "../lib/config.js";

export async function requireSession(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const cookieName = isProd
    ? "__Secure-better-auth.session_token"
    : "better-auth.session_token";
  const token = req.cookies?.[cookieName]?.split(".")[0];

  if (!token) {
    res.status(401).json({ success: false, message: "Invalid session" });
    return;
  }

  try {
    const [session] = await db
      .select({ id: schema.session.id })
      .from(schema.session)
      .where(
        and(
          eq(schema.session.token, token),
          gt(schema.session.expiresAt, new Date()),
        ),
      )
      .limit(1);

    if (!session) {
      res.status(401).json({ success: false, message: "Invalid session" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error validating session:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
