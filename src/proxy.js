//import { NextResponse } from 'next/server'
// 
//// This function can be marked `async` if using `await` inside
//export function proxy(request) {
//  return NextResponse.redirect(new URL('/home', request.url))
//}
// 
//// Alternatively, you can use a default export:
//// export default function proxy(request) { ... }
// 
//export const config = {
//  matcher: ["/all-pets"],
//}




import { NextResponse } from 'next/server'

export function proxy(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: ["/all-pets", "/all-pets/:path*"], 
};