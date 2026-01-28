"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminWords,
  createAdminWord,
  AdminWord,
} from "@/src/lib/adminWords";

export const useAdminWords = (wordbookUuid: string) => {
  const queryClient = useQueryClient();

  // 🔽 admin 単語一覧取得
  const {
    data: words = [],
    isLoading,
    isError,
  } = useQuery<AdminWord[]>({
    queryKey: ["adminWords", wordbookUuid],
    queryFn: () => fetchAdminWords(wordbookUuid),
    enabled: !!wordbookUuid,
  });

  // admin 単語登録
  const createWordMutation = useMutation({
    mutationFn: (params: {
      question: string;
      answer: string;
    }) => createAdminWord(wordbookUuid, params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminWords", wordbookUuid],
      });
    },
  });

  return {
    words,
    loading: isLoading,
    error: isError,
    addWord: createWordMutation.mutateAsync,
  };
};
