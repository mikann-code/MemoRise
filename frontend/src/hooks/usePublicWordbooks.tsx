"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicWordbooks,
  PublicWordbook,
} from "@/src/lib/publicWordbooks";

export const usePublicWordbooks = () => {
  const {
    data: wordbooks = [],
    isLoading,
    isError,
  } = useQuery<PublicWordbook[]>({
    queryKey: ["publicWordbooks"],
    queryFn: () => fetchPublicWordbooks(),
  });

  return {
    wordbooks,
    loading: isLoading,
    error: isError,
  };
};
