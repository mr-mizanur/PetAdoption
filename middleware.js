
import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

   
    const protectedRoutes = ['/dashboard/add-pet', '/dashboard/add-pet', '/dashboard/my-listings'];
    
    // ২. কুকি চেক করুন (better-auth এর সেশন টোকেন দিয়ে)
    const sessionToken = request.cookies.get('__Secure-better-auth.session_token');

    if (protectedRoutes.some(route => pathname.startsWith(route)) && !sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}