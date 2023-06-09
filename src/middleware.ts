/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token: any = req.cookies.get('USER_TOKEN');
  if (req.nextUrl.pathname === '/auth/login/' && token) {
    return NextResponse.redirect('http://localhost:3001/data/management');
  }
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect('http://localhost:3001/auth/login');
  }
  if (req.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect('http://localhost:3001/data/management');
  }
  if (
    req.nextUrl.pathname.startsWith('/data/management') &&
    token?.value === undefined
  ) {
    return NextResponse.redirect('http://localhost:3001/auth/login');
  }
  return NextResponse.next();
}
