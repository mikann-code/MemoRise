"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWordbooks,
  fetchWordbook, 
  createWordbook,
  deleteWordbook,
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

  // 単語帳削除
  const deleteWordbookMutation = useMutation({
    mutationFn: (uuid: string) => deleteWordbook(uuid),

    onSuccess: () => {
      // 削除成功後に一覧を再取得
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
    deleteWordbook: deleteWordbookMutation.mutateAsync,
  };
};

// #show
export const useWordbook = (uuid: string) => {
  const {
    data: wordbook,
    isLoading,
    isError,
  } = useQuery<Wordbook>({
    queryKey: ["wordbook", uuid],
    queryFn: () => fetchWordbook(uuid),
    enabled: !!uuid,
  });

  return {
    wordbook,
    loading: isLoading,
    error: isError,
  };
};