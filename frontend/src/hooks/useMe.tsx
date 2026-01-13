"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/src/lib/me";
import { User } from "@/src/types/user";

// React Query が Context を使って、裏で全部つないでいるからimportなしで使える

export const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const data = await fetchMe();
      return data.user; 
    },
    retry: false, 
  });
};
