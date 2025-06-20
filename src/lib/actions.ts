"use server";

import { setAuthToken, clearAuthToken, redirectIfAuthenticated } from "./auth";
import { User } from "./auth";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Server Action для входа пользователя
 */
export async function loginUser(credentials: LoginCredentials) {
  try {
    // TODO: Здесь должна быть реальная проверка с вашим API
    // Это пример для демонстрации
    if (
      credentials.email === "test@example.com" &&
      credentials.password === "password"
    ) {
      const user: User = {
        id: "1",
        email: credentials.email,
        firstName: "John",
        lastName: "Doe",
      };

      // Генерируем фиктивный токен (в реальном приложении это будет JWT)
      const token = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      await setAuthToken(token, user);

      return { success: true, user };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

/**
 * Server Action для регистрации пользователя
 */
export async function registerUser(data: RegisterData) {
  try {
    // TODO: Здесь должна быть реальная регистрация с вашим API
    // Это пример для демонстрации
    const user: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    // Генерируем фиктивный токен
    const token = `token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    await setAuthToken(token, user);

    return { success: true, user };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Registration failed" };
  }
}

/**
 * Server Action для выхода пользователя
 */
export async function logoutUser() {
  try {
    await clearAuthToken();
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

/**
 * Server Action для проверки аутентификации на страницах входа/регистрации
 */
export async function checkAuthRedirect() {
  await redirectIfAuthenticated();
}
