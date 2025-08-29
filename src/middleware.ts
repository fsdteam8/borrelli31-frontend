// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass static files, _next, and public routes
  if (
    pathname.startsWith("/_next") ||
    /\.(.*)$/.test(pathname) ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Get session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is not logged in and tries to access /dashboard
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in but not admin, block /dashboard
  if (pathname.startsWith("/dashboard") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow all other routes
  return NextResponse.next();
}

// Apply middleware only to /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
