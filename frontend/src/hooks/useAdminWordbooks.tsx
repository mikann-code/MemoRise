"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminWordbooks,
  createAdminWordbook,
  AdminWordbook,
  CreateAdminWordbookParams,
} from "@/src/lib/adminWordbooks";

export const useAdminWordbooks = () => {
  const queryClient = useQueryClient();

  // 親単語帳一覧取得
  const {
    data: wordbooks = [],
    isLoading,
    isError,
  } = useQuery<AdminWordbook[]>({
    queryKey: ["adminWordbooks"],
    queryFn: fetchAdminWordbooks,
  });

  // 単語帳作成（親・子 共通）
  const createWordbookMutation = useMutation({
    mutationFn: (params: CreateAdminWordbookParams) =>
      createAdminWordbook(params),
    onSuccess: (_, variables) => {
      // 親一覧更新
      queryClient.invalidateQueries({ queryKey: ["adminWordbooks"] });

      // 子作成時は、その親の children も更新
      if (variables.parent_uuid) {
        queryClient.invalidateQueries({
          queryKey: ["adminWordbookChildren", variables.parent_uuid],
        });
      }
    },
  });

  return {
    wordbooks,
    loading: isLoading,
    error: isError,

    // 親・子 共通作成
    addWordbook: createWordbookMutation.mutateAsync,
    creating: createWordbookMutation.isPending,
  };
};
