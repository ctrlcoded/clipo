// Middleware to protect routes using NextAuth
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Main middleware function
export default withAuth(
  function middleware() {
    // If authorized, continue to the requested route
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Allow access to authentication and public pages
        if (
          pathname.startsWith("/api/auth") || // Auth API routes
          pathname === "/login" ||            // Login page
          pathname === "/register"            // Register page
        )
          return true;

        // Allow access to homepage and video-related API routes
        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        // Require authentication token for all other paths
        return !!token;
      },
    },
  }
);

// Matcher config defines which routes this middleware applies to
export const config = {
  matcher: [
    /*
     * Apply middleware to all routes EXCEPT:
     * - _next/static (built static files)
     * - _next/image (Next.js image optimization)
     * - favicon.ico
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
