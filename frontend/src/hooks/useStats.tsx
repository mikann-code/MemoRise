"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTotalWords } from "@/src/lib/stats";

export function useStats() {
  return useQuery({
    queryKey: ["totalWords"],
    queryFn: fetchTotalWords,
    staleTime: 1000 * 60, 
  });
}
