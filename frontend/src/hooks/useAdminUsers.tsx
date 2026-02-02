"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminUsers, AdminUser } from "@/src/lib/adminUser";

export const useAdminUsers = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<AdminUser[]>({
    queryKey: ["adminUsers"],
    queryFn: fetchAdminUsers,
  });

  return {
    users,
    loading: isLoading,
    error: isError,
  };
};
