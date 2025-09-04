import { NextRequest, NextResponse } from "next/server";

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/register",
  "/jobs"
];

// Check if current route is public
const isPublicRoute = (pathname: string) => {
  return PUBLIC_ROUTES.some(
    (publicPath) =>
      pathname === publicPath || pathname.startsWith(`${publicPath}/`)
  );
};

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const isLoggedIn = Boolean(accessToken);

  const isLoginPage = pathname.endsWith("/login");
  const isLogout = searchParams.get("logout") === "true";

  const nextRedirect = (url: string) => {
    const baseUrl = new URL(
      `${url.startsWith("/") ? url : "/" + url}`,
      request.url
    );
    for (const [key, value] of searchParams.entries()) {
      baseUrl.searchParams.append(key, value);
    }
    return NextResponse.redirect(baseUrl);
  };

  // ✅ Allow public routes without login
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ✅ Redirect root ("/") to /dashboard if logged in
  if (isLoggedIn && pathname === "/") {
    return nextRedirect("/dashboard");
  }

  // ✅ Redirect logged-in users away from login page (unless logout query is set)
  if (isLoginPage && isLoggedIn && !isLogout) {
    return nextRedirect("/dashboard");
  }

  // ✅ Force login if not logged in and not on login page
  if (!isLoggedIn && !isLoginPage) {
    return nextRedirect("/login");
  }

  const response = NextResponse.next();
  response.headers.set("x-auth", isLoggedIn ? "true" : "false");
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
