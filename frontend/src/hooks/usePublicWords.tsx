"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPublicWords, PublicWord } from "@/src/lib/publicWords";

export const usePublicWords = (wordbookUuid?: string) => {
  const {
    data: words = [],
    isLoading,
    isError,
  } = useQuery<PublicWord[]>({
    queryKey: ["publicWords", wordbookUuid],
    queryFn: () => {
      if (!wordbookUuid) return Promise.resolve([]);
      return fetchPublicWords(wordbookUuid);
    },
    enabled: !!wordbookUuid,
  });

  return {
    words,
    loading: isLoading,
    error: isError,
  };
};
