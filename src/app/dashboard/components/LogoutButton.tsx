"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/mutations/useAuth";

export default function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/auth/login");
        router.refresh();
      },
      onError: (error: Error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
    >
      {logoutMutation.isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
