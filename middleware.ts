import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const { pathname, search } = req.nextUrl;

  const protectedRoutes = ['/project', '/invite'];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // حماية الصفحات
  if (!token && isProtectedRoute) {
    const authUrl = new URL('/signup', req.url);

    authUrl.searchParams.set('redirect', pathname + search);

    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/project/:path*', '/invite/:path*'],
};
