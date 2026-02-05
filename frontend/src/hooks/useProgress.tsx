import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWordbookProgress,
  completeWordbook,
  WordbookPartProgress,
} from "@/src/lib/progress";

// 取得用（親単語帳単位・uuid）
export const useProgress = (parentUuid: string) => {
  return useQuery<WordbookPartProgress[], Error>({
    queryKey: ["wordbookProgress", parentUuid],
    queryFn: () => fetchWordbookProgress(parentUuid),
    staleTime: 1000 * 60,
  });
};

// 完了用（uuid）
export const useCompleteWordbook = (parentUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wordbookUuid: string) =>
      completeWordbook(wordbookUuid),

    onSuccess: () => {
      // この親単語帳の進捗だけ再取得
      queryClient.invalidateQueries({
        queryKey: ["wordbookProgress", parentUuid],
      });
    },
  });
};
