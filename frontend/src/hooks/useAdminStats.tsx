"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminStats, AdminStats } from "@/src/lib/adminStats";

export const useAdminStats = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<AdminStats>({
    queryKey: ["adminStats"],
    queryFn: fetchAdminStats,
  });

  return {
    stats: data,
    loading: isLoading,
    error: isError,
  };
};