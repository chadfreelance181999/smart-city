import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import moment from 'moment'
import { DepartmentReportsModel, DepartmentsModel } from '@/app/generated/prisma/internal/prismaNamespaceBrowser'

interface DepartmentsWithReports extends DepartmentsModel {
  reports: DepartmentReportsModel[]
}

export const GET = async (request: Request) => {
  const startOfWeek = moment().isoWeekday(1).startOf('day').toDate()
  const endOfWeek = moment().isoWeekday(5).endOf('day').toDate()

  const reports = await prisma.departmentReports.findMany({
    where: {
      createdAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },

    orderBy: {
      createdAt: 'asc',
    },

    include: {
      department: true,
      metrics: true,
    },
  })

  const groupedReports = reports.reduce((acc, report) => {
    if (acc.find((dept) => dept.id === report.departmentId)) {
      acc = acc.map((dept) => {
        if (dept.id === report.departmentId) {
          return {
            ...dept,
            reports: [...dept.reports, report],
          }
        }
        return dept;
      })
    } else {
      acc.push({
        id: report.departmentId,
        link: report.department.link,
        title: report.department.title,
        subTitle: report.department.subTitle,
        icon: report.department.icon,
        description: report.department.description,
        color: report.department.color,
        reports: [report],
      })
    }
    return acc;
  }, [] as DepartmentsWithReports[]);

  return NextResponse.json(groupedReports)
}