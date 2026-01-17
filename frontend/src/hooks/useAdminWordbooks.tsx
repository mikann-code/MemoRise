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

  //  一覧取得（GET）
  const {
    data: wordbooks = [],
    isLoading,
    isError,
  } = useQuery<AdminWordbook[]>({
    queryKey: ["adminWordbooks"],
    queryFn: fetchAdminWordbooks,
  });

  //  新規作成（POST）
  const createWordbookMutation = useMutation({
    mutationFn: (params: CreateAdminWordbookParams) =>
      createAdminWordbook(params),

    onSuccess: () => {
      // 一覧を再取得
      queryClient.invalidateQueries({
        queryKey: ["adminWordbooks"],
      });
    },
  });

  return {
    wordbooks,
    loading: isLoading,
    error: isError,
    addWordbook: createWordbookMutation.mutateAsync,
    creating: createWordbookMutation.isPending,
  };
};
