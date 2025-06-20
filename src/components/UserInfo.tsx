"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/auth";

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Получаем информацию о пользователе из cookies на клиенте
    const getUserInfo = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to get user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="hidden md:block">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
        {user.firstName.charAt(0)}
        {user.lastName.charAt(0)}
      </div>
      <span className="hidden md:block text-sm font-medium text-gray-700">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}
