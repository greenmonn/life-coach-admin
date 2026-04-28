import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_AUTH_COOKIE,
  ADMIN_DEFAULT_AUTHENTICATED_PATH,
  ADMIN_LOGIN_PATH,
  isAdminSessionValid,
} from "@/lib/admin-auth";

function isPublicPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/auth")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = isAdminSessionValid(request.cookies.get(ADMIN_AUTH_COOKIE)?.value);

  if (pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL(ADMIN_DEFAULT_AUTHENTICATED_PATH, request.url));
  }

  if (!isAuthenticated && !isPublicPath(pathname)) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
