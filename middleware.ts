import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token');
  const url = req.nextUrl.clone();

  if (!accessToken && url.pathname !== '/auth/sign-in') {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  if (accessToken && url.pathname === '/auth/sign-in') {
    return NextResponse.redirect(new URL('/', req.url)); // Adjust the redirect URL as needed
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/sign-in', '/my-orders', '/order-details/:path*'],
};
