import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { checkAuthRedirect } from "@/lib/actions";

const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication - Post Everywhere",
  description: "Sign in or create an account",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Проверяем, не залогинен ли уже пользователь
  await checkAuthRedirect();

  return (
    <div
      className={`${robotoFont.variable} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
