/*
  Warnings:

  - You are about to drop the column `moduleId` on the `DepartmentReports` table. All the data in the column will be lost.
  - Added the required column `departmentId` to the `DepartmentReports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DepartmentReports" DROP CONSTRAINT "DepartmentReports_moduleId_fkey";

-- AlterTable
ALTER TABLE "DepartmentReports" DROP COLUMN "moduleId",
ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DepartmentReports" ADD CONSTRAINT "DepartmentReports_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
