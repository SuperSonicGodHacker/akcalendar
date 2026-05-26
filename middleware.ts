import { type NextRequest, NextResponse } from "next/server"

const PUBLIC_PATHS = ["/login", "/api/auth/login", "/api/auth/verify-otp"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths and static assets
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(ico|png|svg|jpg|jpeg|webp)$/)
  ) {
    return NextResponse.next()
  }

  const sessionId = request.cookies.get("session")?.value
  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
