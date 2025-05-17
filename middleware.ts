/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token');
  const userType = req.cookies.get('user_type');

  const url = req.nextUrl.clone();
  console.log('userType', userType);

  if (!accessToken && url.pathname !== '/auth/sign-in') {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  if (accessToken && url.pathname === '/auth/sign-in') {
    return NextResponse.redirect(new URL('/', req.url)); // Adjust the redirect URL as needed
  }
  // Check if the user is an admin
  if (userType?.value !== 'MERCHANT' && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect non-admin users away from admin routes
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/sign-in',
    '/my-orders',
    '/order-details/:path*',
    '/order-summary',
    '/admin/:path*',
    '/cashier/:path*',
  ],
};
