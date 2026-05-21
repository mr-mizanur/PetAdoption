



import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;


  const token =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;


  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/my-requests/:path*",
    "/dashboard/add-pet/:path*",
    "/dashboard/my-listing/:path*",
    
  ],
}
