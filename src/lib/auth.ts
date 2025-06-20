import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
  user: User;
}

// Константы для работы с cookies
const AUTH_COOKIE_NAME = "auth-token";
const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 дней в секундах

/**
 * Получить токен аутентификации из cookies
 */
export async function getAuthToken(): Promise<AuthToken | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!authCookie?.value) {
    return null;
  }

  try {
    const tokenData = JSON.parse(authCookie.value) as AuthToken;

    // Проверяем, не истек ли токен
    if (Date.now() > tokenData.expiresAt) {
      return null;
    }

    return tokenData;
  } catch (error) {
    console.error("Failed to parse auth token:", error);
    return null;
  }
}

/**
 * Получить информацию о пользователе из токена
 */
export async function getCurrentUser(): Promise<User | null> {
  const authToken = await getAuthToken();
  return authToken?.user || null;
}

/**
 * Проверить, аутентифицирован ли пользователь
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return token !== null;
}

/**
 * Перенаправить неаутентифицированных пользователей на страницу входа
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
}

/**
 * Перенаправить аутентифицированных пользователей на dashboard
 */
export async function redirectIfAuthenticated(): Promise<void> {
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }
}

/**
 * Установить токен аутентификации в cookies
 * Эта функция должна использоваться в Server Actions или API routes
 */
export async function setAuthToken(token: string, user: User): Promise<void> {
  const cookieStore = await cookies();

  const authData: AuthToken = {
    token,
    expiresAt: Date.now() + AUTH_COOKIE_MAX_AGE * 1000,
    user,
  };

  cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(authData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_COOKIE_MAX_AGE,
    path: "/",
  });
}

/**
 * Удалить токен аутентификации из cookies
 */
export async function clearAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

/**
 * Обновить токен аутентификации
 */
export async function refreshAuthToken(newToken: string): Promise<void> {
  const currentToken = await getAuthToken();

  if (currentToken) {
    await setAuthToken(newToken, currentToken.user);
  }
}
