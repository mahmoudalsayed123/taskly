import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

const protectedRoutes = ['/project'];

const authRoutes = ['/login', '/signup'];

const protectedApiRoutes = ['/api/project', '/api/task', '/api/epic'];

const publicApiRoutes = ['/api/auth/login', '/api/auth/signup'];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Public APIs
  if (publicApiRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isProtectedApiRoute = protectedApiRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const token = request.cookies.get('token')?.value;

  // لو المستخدم عامل Login وراح /login أو /signup
  if (isAuthRoute) {
    if (!token) {
      return NextResponse.next();
    }

    const payload = await verifyToken(token);

    if (payload) {
      return NextResponse.redirect(new URL('/project', request.url));
    }

    const response = NextResponse.next();
    response.cookies.delete('token');
    return response;
  }

  // أى Route غير محمى
  if (!isProtectedRoute && !isProtectedApiRoute) {
    return NextResponse.next();
  }

  const unauthorizedResponse = () => {
    if (isProtectedApiRoute) {
      const response = NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 },
      );

      response.cookies.delete('token');

      return response;
    }

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname + search);

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('token');

    return response;
  };

  if (!token) {
    return unauthorizedResponse();
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/project/:path*', '/api/:path*', '/login', '/signup'],
};
