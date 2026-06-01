import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const departments = await prisma.departments.findMany({
    where: {
      reports: {
        some: {}
      }
    },
    orderBy: {
      id: 'asc'
    },
    include: {
      reports: true,
    },
  })

  return NextResponse.json(departments)
}