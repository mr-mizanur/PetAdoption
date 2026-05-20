// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const sessionToken = request.cookies.get('__Secure-better-auth.session_token');


    if (request.nextUrl.pathname.startsWith('/all-pets')) {
        if (!sessionToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next();
}