import { NextResponse } from "next/server";

export function middleware(request) {
  const sessionToken = request.cookies.get("better-auth.session_token"); 
  const { pathname, search } = request.nextUrl;

  const protectedRoutes = [
    "/all-pets",
    "/dashboard/my-requests",
    "/dashboard/add-pet",
    "/dashboard/my-listing"
  ];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !sessionToken) {
    // এখানে আমরা callbackUrl যোগ করছি যাতে লগইনের পর ইউজার আবার ফিরে আসতে পারে
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/all-pets",
    "/dashboard/my-requests",
    "/dashboard/add-pet",
    "/dashboard/my-listing"
  ],
};