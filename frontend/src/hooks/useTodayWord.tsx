"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTodayWord, TodayWord } from "@/src/lib/todayWord";

export const useTodayWord = () => {
  const query = useQuery<TodayWord>({
    queryKey: ["todayWord"],
    queryFn: fetchTodayWord,
  });

  return {
    todayWord: query.data,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};