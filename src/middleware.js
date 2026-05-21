import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // token চেক করার লজিক ঠিক আছে
  const token =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // প্রটেক্টেড রাউট চেক
  const protectedRoutes = [
    "/dashboard/my-requests",
    "/dashboard/add-pet",
    "/dashboard/my-listing",
    "/all-pets",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // আপনার দেয়া ম্যাচার ঠিক আছে
  matcher: [
    "/dashboard/my-requests/:path*",
    "/dashboard/add-pet/:path*",
    "/dashboard/my-listing/:path*",
    "/all-pets/:path*",
  ],
};