/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token');
  const userType = req.cookies.get('user_type');

  const url = req.nextUrl.clone();

  // Check if the user is trying to access a protected route without authentication

  if (!accessToken && !url.pathname.startsWith('/auth')) {
    if (url.pathname.startsWith('/auth/cashier')) {
      return NextResponse.redirect(new URL('/auth/cashier/sign-in', req.url)); // Redirect to cashier sign-in
    } else {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url)); // Redirect to sign-in
    }
  }

  if (accessToken && url.pathname === '/auth/sign-in') {
    return NextResponse.redirect(new URL('/', req.url)); // Adjust the redirect URL as needed
  }

  if (
    accessToken &&
    (url.pathname === '/auth/change-forgot-password' ||
      url.pathname === '/auth/forgot-password')
  ) {
    return NextResponse.redirect(new URL('/', req.url)); // Adjust the redirect URL as needed
  }

  if (accessToken && url.pathname === '/auth/cashier/sign-in') {
    return NextResponse.redirect(new URL('/', req.url)); // Adjust the redirect URL as needed
  }
  // Check if the user is an admin
  if (userType?.value !== 'MERCHANT' && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect non-admin users away from admin routes
  }
  if (userType?.value !== 'CASHIER' && url.pathname.startsWith('/cashier')) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect non-admin users away from admin routes
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/sign-in',
    '/auth/cashier/sign-in',
    '/auth/cashier/:path*',
    '/cashier/:path*',
    '/my-orders',
    '/order-details/:path*',
    '/order-summary',
    '/admin/:path*',
    '/cashier/:path*',
    '/card-balance',
  ],
};
