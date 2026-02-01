"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTotalWords, TotalWordsResponse } from "@/src/lib/stats";

export function useStats() {
  return useQuery<TotalWordsResponse>({
    queryKey: ["totalWords"],
    queryFn: fetchTotalWords,
    staleTime: 1000 * 60,
  });
}
