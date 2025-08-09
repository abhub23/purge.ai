/*
  Warnings:

  - Made the column `userId` on table `plan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."plan" ALTER COLUMN "userId" SET NOT NULL;
