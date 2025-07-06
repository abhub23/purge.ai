/*
  Warnings:

  - You are about to drop the column `googleId` on the `user` table. All the data in the column will be lost.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "user_googleId_key";

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "googleId",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT;
