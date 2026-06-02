// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const publicPaths = ['/', '/dashboard/login', '/admin/login'];

  if (publicPaths.includes(pathName)) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('authjs.session-token');

  // if (!authCookie?.value) {
  //   const redirectUrl = pathName.startsWith('/admin') ? '/admin/login' : '/dashboard/login';
  //   return NextResponse.redirect(new URL(redirectUrl, request.url));
  // }

  return NextResponse.next();
}

export default proxy;

// Target specific route segments
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};