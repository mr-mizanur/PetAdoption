import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // কনসোল লগ দিয়ে চেক করুন মিডলওয়্যারটি কল হচ্ছে কি না
  console.log("Middleware checking access for:", pathname);

  // আপনার ড্যাশবোর্ডের রাউটগুলো
  const protectedRoutes = [
    '/dashboard/my-requests',
    '/dashboard/add-pet',
    '/dashboard/my-listing',
    '/all-pets'
  ]; 

  // চেক: ইউজার কি প্রোটেক্টেড রাউটে যাওয়ার চেষ্টা করছে?
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // সেশন টোকেন চেক করা
  const sessionToken = 
    request.cookies.get("better-auth.session_token")?.value || 
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // লগইন না থাকলে রিডাইরেক্ট লজিক
  if (isProtectedRoute && !sessionToken) {
    console.log("Access denied! Redirecting to login.");
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {

  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};