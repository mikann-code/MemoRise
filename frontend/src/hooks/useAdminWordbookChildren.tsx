"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminWordbookChildren,
  AdminWordbookChild,
} from "@/src/lib/adminWordbooks";

export const useAdminWordbookChildren = (uuid?: string) => {
  const {
    data: children = [],
    isLoading,
    isError,
  } = useQuery<AdminWordbookChild[]>({
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
