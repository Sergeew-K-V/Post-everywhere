import { useQuery } from "@tanstack/react-query";
import { api, ApiResponse } from "@/lib/api";
import { User } from "@/types/api";

const getUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>("/user");
  return response.data.data;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
