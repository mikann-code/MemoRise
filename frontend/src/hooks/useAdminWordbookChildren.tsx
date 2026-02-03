"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminWordbookChildren,
  AdminWordbook,
} from "@/src/lib/adminWordbooks";

export const useAdminWordbookChildren = (uuid?: string) => {
  const {
    data: children = [],
    isLoading,
    isError,
  } = useQuery<AdminWordbook[]>({
    queryKey: ["adminWordbookChildren", uuid],
    queryFn: () => {
      if (!uuid) return Promise.resolve([]);
      return fetchAdminWordbookChildren(uuid);
    },
    enabled: !!uuid,
  });

  return {
    children,
    loading: isLoading,
    error: isError,
  };
};
