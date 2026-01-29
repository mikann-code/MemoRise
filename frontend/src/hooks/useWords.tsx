"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWords, createWord, deleteWord ,Word } from "@/src/lib/words";

export const useWords = (wordbookUuid: string) => {
  const queryClient = useQueryClient();

  // 🔽 単語一覧取得
  const {
    data: words = [],
    isLoading,
    isError,
  } = useQuery<Word[]>({
    queryKey: ["words", wordbookUuid],
    queryFn: () => fetchWords(wordbookUuid),
    enabled: !!wordbookUuid,
  });

  // 🔽 単語登録（pos なし）
  const createWordMutation = useMutation({
    mutationFn: (params: {
      question: string;
      answer: string;
    }) => createWord(wordbookUuid, params),

    onSuccess: () => {
      // 一覧を再取得
      queryClient.invalidateQueries({
        queryKey: ["words", wordbookUuid],
      });
    },
  });

  const deleteWordMutation = useMutation({
    mutationFn: (wordUuid: string) =>
      deleteWord(wordbookUuid, wordUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words", wordbookUuid],
      });
    },
  });

  return {
    words,
    loading: isLoading,
    error: isError,
    addWord: createWordMutation.mutateAsync,
    deleteWord: deleteWordMutation.mutateAsync,
  };
};
