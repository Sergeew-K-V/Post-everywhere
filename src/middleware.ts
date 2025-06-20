import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Маршруты, которые требуют аутентификации
const protectedRoutes = ["/dashboard", "/posts", "/analytics", "/settings"];

// Маршруты аутентификации (не должны быть доступны залогиненным пользователям)
const authRoutes = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth-token");

  // Проверяем, есть ли валидный токен
  const isAuthenticated = authToken && authToken.value;

  // Если пользователь пытается получить доступ к защищенным маршрутам без аутентификации
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Если залогиненный пользователь пытается получить доступ к страницам аутентификации
  if (
    authRoutes.some((route) => pathname.startsWith(route)) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
