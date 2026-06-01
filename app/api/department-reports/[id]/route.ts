import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const department = await prisma.departmentReports.findUnique({ where: { id: Number(id) } })

  if (!department) return NextResponse.json({ error: 'Report not found' }, { status: 404 })

  return NextResponse.json(department)
}

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json()
    const { title, url, description } = body

    const department = await prisma.departmentReports.update({
      where: { id: Number(id) },
      data: { title, url, description }
    })

    return NextResponse.json(department)
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    await prisma.departmentReports.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ message: 'Report deleted successfully' })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}