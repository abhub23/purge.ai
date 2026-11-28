ALTER TABLE "user" RENAME COLUMN "emailVerified" TO "email_verified";
--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at";
--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "updatedAt" TO "updated_at";
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "expiresAt" TO "expires_at";
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "createdAt" TO "created_at";
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "updatedAt" TO "updated_at";
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "ipAddress" TO "ip_address";
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "userAgent" TO "user_agent";
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "userId" TO "user_id";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "accountId" TO "account_id";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "providerId" TO "provider_id";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "userId" TO "user_id";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "accessToken" TO "access_token";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "refreshToken" TO "refresh_token";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "idToken" TO "id_token";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "accessTokenExpiresAt" TO "access_token_expires_at";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "refreshTokenExpiresAt" TO "refresh_token_expires_at";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "createdAt" TO "created_at";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "updatedAt" TO "updated_at";
--> statement-breakpoint
ALTER TABLE "verification" RENAME COLUMN "expiresAt" TO "expires_at";
--> statement-breakpoint
ALTER TABLE "verification" RENAME COLUMN "createdAt" TO "created_at";
--> statement-breakpoint
ALTER TABLE "verification" RENAME COLUMN "updatedAt" TO "updated_at";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" TYPE timestamp USING "created_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" TYPE timestamp USING "updated_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "expires_at" TYPE timestamp USING "expires_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" TYPE timestamp USING "created_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" TYPE timestamp USING "updated_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "access_token_expires_at" TYPE timestamp USING "access_token_expires_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "refresh_token_expires_at" TYPE timestamp USING "refresh_token_expires_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" TYPE timestamp USING "created_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" TYPE timestamp USING "updated_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "expires_at" TYPE timestamp USING "expires_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" TYPE timestamp USING "created_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" TYPE timestamp USING "updated_at"::timestamp;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email_verified" SET DEFAULT false;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now();
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now();
--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DEFAULT now();
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DEFAULT now();
--> statement-breakpoint
UPDATE "verification" SET "created_at" = now() WHERE "created_at" IS NULL;
--> statement-breakpoint
UPDATE "verification" SET "updated_at" = now() WHERE "updated_at" IS NULL;
--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DEFAULT now();
--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DEFAULT now();
--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "user" RENAME CONSTRAINT "user_email_key" TO "user_email_unique";
--> statement-breakpoint
ALTER TABLE "session" RENAME CONSTRAINT "session_token_key" TO "session_token_unique";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");
--> statement-breakpoint
DROP TABLE "plan";
--> statement-breakpoint
DROP TABLE "temp_users";
--> statement-breakpoint
DROP TYPE "PlanType";