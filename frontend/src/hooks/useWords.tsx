"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWords, createWord, deleteWord ,Word } from "@/src/lib/words";

export const useWords = (wordbookUuid: string) => {
  const queryClient = useQueryClient();

  const {
    data: words = [],
    isLoading,
    isError,
  } = useQuery<Word[]>({
    queryKey: ["words", wordbookUuid],
    queryFn: () => fetchWords(wordbookUuid),
    enabled: !!wordbookUuid,
  });

  const createWordMutation = useMutation({
    mutationFn: (params: {
      question: string;
      answer: string;
    }) => createWord(wordbookUuid, params),

    onSuccess: () => {
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
