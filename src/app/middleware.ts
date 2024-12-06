import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api routes
     * - /_next/static (static files)
     * - /_next/image (image optimization)
     * - /favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Add custom header
  requestHeaders.set("x-middleware-cache", "no-cache");

  // Check if user is authenticated (example using a token in cookies)
  const token = request.cookies.get("auth-token");

  // Public routes logic
  if (request.nextUrl.pathname.startsWith("/sign-in, /sign-up, /")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Protected routes logic
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
