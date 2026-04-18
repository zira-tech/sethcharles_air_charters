import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }
  
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("next-auth.session-token") || 
                          request.cookies.get("__Secure-next-auth.session-token");
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};