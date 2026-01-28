"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicWordbookChildren,
  PublicWordbookChild,
} from "@/src/lib/publicWordbooks";

export const usePublicWordbookChildren = (parentUuid?: string) => {
  const {
    data: children = [],
    isLoading,
    isError,
  } = useQuery<PublicWordbookChild[]>({
    queryKey: ["publicWordbookChildren", parentUuid],
    queryFn: () => {
      if (!parentUuid) return Promise.resolve([]);
      return fetchPublicWordbookChildren(parentUuid);
    },
    enabled: !!parentUuid, // parentUuid がある時だけ実行
  });

  return {
    children,
    loading: isLoading,
    error: isError,
  };
};
