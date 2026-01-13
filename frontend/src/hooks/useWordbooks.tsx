"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchWordbooks, Wordbook } from "@/src/lib/wordbooks";

export const useWordbooks = () => {
  return useQuery<Wordbook[]>({
    queryKey: ["wordbooks"],
    queryFn: fetchWordbooks,
  });
};
