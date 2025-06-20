import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiResponse } from "@/lib/api";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types/api";

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    credentials
  );
  return response.data.data;
};

const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    credentials
  );
  return response.data.data;
};

const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store token
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Set user data in cache
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      // Store token
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Set user data in cache
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Remove token
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }

      // Clear user data from cache
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
