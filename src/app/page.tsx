import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Проверяем аутентификацию пользователя
  const authenticated = await isAuthenticated();

  if (authenticated) {
    // Если пользователь залогинен, перенаправляем на dashboard
    redirect("/dashboard");
  } else {
    // Если пользователь не залогинен, перенаправляем на страницу входа
    redirect("/auth/login");
  }
}
