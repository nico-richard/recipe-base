-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_typeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
