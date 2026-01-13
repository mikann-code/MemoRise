"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginParams, LoginResponse } from "@/src/types/user";
import { login } from "@/src/lib/login";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem("token", data.token);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/my-page");
    },
  });
};
