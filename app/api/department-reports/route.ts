import { ReportMetricsModel } from '@/app/generated/prisma/internal/prismaNamespaceBrowser'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const departmentReports = await prisma.departmentReports.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  return NextResponse.json(departmentReports)
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { title, description, metrics, departmentId } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
    }

    const department = await prisma.departmentReports.create({
      data: { title, description, metrics: { create: metrics }, department: { connect: { id: departmentId } } },
    })

    return NextResponse.json(department, { status: 201 })
  } catch (err: any) {
    console.log(err)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}