"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicWordbooks,
  fetchPublicWordbook, 
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

export const usePublicWordbook = (uuid: string) => {
  const {
    data: wordbook,
    isLoading,
    isError,
  } = useQuery<PublicWordbook>({
    queryKey: ["publicWordbook", uuid],
    queryFn: () => fetchPublicWordbook(uuid),
    enabled: !!uuid, // uuid がある時だけ実行
  });

  return {
    wordbook,
    loading: isLoading,
    error: isError,
  };
};
