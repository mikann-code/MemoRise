"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWordbooks,
  createWordbook,
  Wordbook,
} from "@/src/lib/wordbooks";

export const useWordbooks = () => {
  const queryClient = useQueryClient();

  // 単語帳一覧取得
  const {
    data: wordbooks = [],
    isLoading,
    isError,
  } = useQuery<Wordbook[]>({
    queryKey: ["wordbooks"],
    queryFn: fetchWordbooks,
  });

  // 単語帳作成
  const createWordbookMutation = useMutation({
    mutationFn: (params: { title: string; description?: string | null }) =>
      createWordbook(params),

    onSuccess: () => {
      // 作成成功後に一覧を再取得
      queryClient.invalidateQueries({
        queryKey: ["wordbooks"],
      });
    },
  });

  return {
    wordbooks,
    loading: isLoading,
    error: isError,
    createWordbook: createWordbookMutation.mutateAsync,
  };
};
