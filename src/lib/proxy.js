import { NextResponse } from 'next/server';

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  
  const protectedRoutes = [
    '/my-requests',
    '/add-pet',
    '/my-listing',
    '/all-pets'
  ]; 

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    
    const sessionToken = 
      request.cookies.get("better-auth.session_token")?.value || 
      request.cookies.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {

      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};