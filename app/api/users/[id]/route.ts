import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) => {
    const { id } = await params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) }})

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const { password: _pwd, ...safeUser } = user

    return NextResponse.json(safeUser);
}