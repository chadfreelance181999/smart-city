import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { scryptSync, timingSafeEqual } from 'crypto'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Attach raw backend token or user fields to the JWT payload
                token.userType = user.userType;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // Inject the token into the session accessible by your app
                session.user.userType = token.userType;
            }
            return session;
        }
    },
    providers: [Credentials({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'email', placeholder: 'john.doe@domain.com' },
            password: { label: 'Password', type: 'password' },
            userType: { label: 'User Type', type: 'hidden' }
        },
        async authorize(credentials, req) {
            if (credentials === null) return null

            const user = await prisma.user.findFirst({ where: { email: credentials?.email as string ?? '', userType: credentials?.userType ?? 'USER' } })

            if (!user) return null

            // Stored password format: <salt>:<derivedHex>
            const stored = user.password
            if (!stored) return null

            const parts = stored.split(':')
            if (parts.length !== 2) return null

            const [salt, storedHex] = parts

            try {
                const derived = scryptSync(credentials?.password as string ?? '', salt, 64)
                const storedBuf = Buffer.from(storedHex, 'hex')

                if (derived.length !== storedBuf.length) return null

                if (!timingSafeEqual(derived, storedBuf)) return null

                // Authentication succeeded
                return {
                    email: user.email,
                    id: user.id.toString(),
                    name: user.firstName,
                    userType: user.userType
                }
            } catch (err) {
                console.error('Error during password verification:', err)
                return null
            }
        },
    }),
    ],

    secret: process.env.BETTER_AUTH_SECRET,
})