import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { randomBytes, scryptSync } from 'crypto'

export const GET = async (request: Request) => {
  const users = await prisma.user.findMany({
    omit: {
      password: true
    },
    orderBy: {
      id: 'asc'
    }
  })

  return NextResponse.json(users)
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, middleName, userType } = body

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
    }

    const salt = randomBytes(16).toString('hex')
    const derived = scryptSync(password, salt, 64).toString('hex')
    const passwordToStore = `${salt}:${derived}`

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordToStore,
        firstName,
        lastName,
        middleName: middleName ?? null,
        userType: userType ?? undefined,
      },
    })

    const { password: _pwd, ...safeUser } = user

    return NextResponse.json(safeUser, { status: 201 })
  } catch (err: any) {
    // Prisma unique constraint error code
    if (err?.code === 'P2002' || err?.message?.includes('Unique')) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}