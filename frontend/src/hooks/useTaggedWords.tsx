import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTaggedWords,
  addTaggedWord,
  removeTaggedWord,
  TaggedWord,
} from "@/src/lib/taggedWord";

export const useTaggedWords = () => {
  const queryClient = useQueryClient();

  // 一覧取得
  const {
    data: taggedWords = [],
    isLoading,
    isError,
  } = useQuery<TaggedWord[]>({
    queryKey: ["taggedWords"],
    queryFn: fetchTaggedWords,
  });

  // 追加
  const addMutation = useMutation({
    mutationFn: (wordId: string) => addTaggedWord(wordId),
    onSuccess: () => {
      // 追加後に再取得
      queryClient.invalidateQueries({ queryKey: ["taggedWords"] });
    },
  });

  // 削除
  const removeMutation = useMutation({
    mutationFn: (wordId: string) => removeTaggedWord(wordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taggedWords"] });
    },
  });

  return {
    taggedWords,
    isLoading,
    isError,
    addTaggedWord: addMutation.mutateAsync,
    removeTaggedWord: removeMutation.mutateAsync,
  };
};
