-- DropForeignKey
ALTER TABLE "public"."plan" DROP CONSTRAINT "plan_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."plan" ADD CONSTRAINT "plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
