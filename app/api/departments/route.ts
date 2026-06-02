import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const departments = await prisma.departments.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
      reports: true,
    },
  })

  return NextResponse.json(departments)
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { title, link, subTitle, description, icon, color } = body

    if (!title || !link) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
    }

    const department = await prisma.departments.create({
      data: { title, link, subTitle, description, icon, color },
    })

    return NextResponse.json(department, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}