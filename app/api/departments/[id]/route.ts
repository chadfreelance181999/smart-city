import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const department = await prisma.departments.findUnique({ where: { id: Number(id) } })

  if (!department) return NextResponse.json({ error: 'Department not found' }, { status: 404 })

  return NextResponse.json(department)
}

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json()
    const { title, link, subTitle, description, icon } = body

    const department = await prisma.departments.update({
      where: { id: Number(id) },
      data: { title, link, subTitle, description, icon }
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

    await prisma.departments.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ message: 'Department deleted successfully' })
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}