/*
  Warnings:

  - You are about to drop the column `credits` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "credits";

-- CreateTable
CREATE TABLE "temp_users" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credits" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "temp_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "temp_users_ipAddress_idx" ON "temp_users"("ipAddress");
