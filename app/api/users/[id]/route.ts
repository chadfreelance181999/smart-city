import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) => {
    const { id } = await params

    const user = await prisma.user.findUnique({ where: { id: Number(id) }})

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const { password: _pwd, ...safeUser } = user

    return NextResponse.json(safeUser)
}

export const PUT = async (
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) => {
    const { id } = await params

    const body = await request.json()
    const { email, firstName, lastName, middleName, userType } = body

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
            email,
            firstName,
            lastName,
            middleName,
            userType
        }
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const { password: _pwd, ...safeUser } = user

    return NextResponse.json(safeUser)
}

export const DELETE = async (
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) => {
    const { id } = await params;

    await prisma.user.delete({
        where: { id: Number(id) }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
}