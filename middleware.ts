import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth-storage');
  const isAuthenticated = authCookie && JSON.parse(authCookie.value).state.user;
  const isAuthPage = request.nextUrl.pathname === '/auth';

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/browse', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};