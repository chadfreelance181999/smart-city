-- CreateTable
CREATE TABLE "ReportMetrics" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportMetrics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportMetrics" ADD CONSTRAINT "ReportMetrics_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DepartmentReports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
