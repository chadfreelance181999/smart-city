-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "subTitle" TEXT,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentReports" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DepartmentReports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_title_key" ON "Departments"("title");

-- AddForeignKey
ALTER TABLE "DepartmentReports" ADD CONSTRAINT "DepartmentReports_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
