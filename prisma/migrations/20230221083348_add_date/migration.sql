/*
  Warnings:

  - Added the required column `open_date` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "open_date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "TermAndCondition" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TermAndCondition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
