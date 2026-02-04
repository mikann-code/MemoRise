"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminWordbooks,
  createParentWordbook,
  createChildWordbook,
  deleteParentWordbook,
  deleteChildWordbook, // ★追加
  updateParentWordbook,
  AdminWordbook,
  CreateParentWordbookParams,
  CreateChildWordbookParams,
  UpdateParentWordbookParams,
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

  // 親単語帳 作成
  const createParentMutation = useMutation({
    mutationFn: (params: CreateParentWordbookParams) =>
      createParentWordbook(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWordbooks"] });
    },
  });

  // 子単語帳 作成
  const createChildMutation = useMutation({
    mutationFn: (params: CreateChildWordbookParams) =>
      createChildWordbook(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminWordbooks"] });
      queryClient.invalidateQueries({
        queryKey: ["adminWordbookChildren", variables.parent_uuid],
      });
    },
  });

  // 親単語帳 更新
  const updateParentMutation = useMutation({
    mutationFn: (params: UpdateParentWordbookParams) =>
      updateParentWordbook(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminWordbooks"] });
      queryClient.invalidateQueries({
        queryKey: ["adminWordbookChildren", variables.uuid],
      });
    },
  });

  // 親単語帳 削除
  const deleteParentMutation = useMutation({
    mutationFn: (uuid: string) => deleteParentWordbook(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminWordbooks"] });
    },
  });

  // 子単語帳 削除 ★追加
  const deleteChildMutation = useMutation({
    mutationFn: (uuid: string) => deleteChildWordbook(uuid),
    onSuccess: (_, uuid) => {
      queryClient.invalidateQueries({
        queryKey: ["adminWordbookChildren"],
      });
    },
  });

  return {
    wordbooks,
    loading: isLoading,
    error: isError,

    // 親用
    addParentWordbook: createParentMutation.mutateAsync,
    creatingParent: createParentMutation.isPending,

    updateParentWordbook: updateParentMutation.mutateAsync,
    updatingParent: updateParentMutation.isPending,

    deleteParentWordbook: deleteParentMutation.mutateAsync,
    deletingParent: deleteParentMutation.isPending,

    // 子用
    addChildWordbook: createChildMutation.mutateAsync,
    creatingChild: createChildMutation.isPending,

    deleteChildWordbook: deleteChildMutation.mutateAsync, // ★追加
    deletingChild: deleteChildMutation.isPending,         // ★追加
  };
};
