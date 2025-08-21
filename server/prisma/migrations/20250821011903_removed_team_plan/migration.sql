/*
  Warnings:

  - The values [individual,team] on the enum `PlanType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PlanType_new" AS ENUM ('free', 'pro', 'custom');
ALTER TABLE "public"."plan" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "public"."plan" ALTER COLUMN "type" TYPE "public"."PlanType_new" USING ("type"::text::"public"."PlanType_new");
ALTER TYPE "public"."PlanType" RENAME TO "PlanType_old";
ALTER TYPE "public"."PlanType_new" RENAME TO "PlanType";
DROP TYPE "public"."PlanType_old";
ALTER TABLE "public"."plan" ALTER COLUMN "type" SET DEFAULT 'free';
COMMIT;
