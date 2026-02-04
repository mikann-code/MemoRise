import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWordbookProgress,
  completeWordbook,
  WordbookProgress,
} from "@/src/lib/progress";

// 取得用
export const useProgress = () => {
  return useQuery<WordbookProgress[], Error>({
    queryKey: ["wordbookProgress"],
    queryFn: fetchWordbookProgress,
    staleTime: 1000 * 60,
  });
};

// 完了用（POST / PATCH）
export const useCompleteWordbook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wordbookId: number) => completeWordbook(wordbookId),
    onSuccess: () => {
      // 進捗を再取得
      queryClient.invalidateQueries({ queryKey: ["wordbookProgress"] });
    },
  });
};
