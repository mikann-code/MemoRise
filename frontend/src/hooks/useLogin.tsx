"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginParams, LoginResponse } from "@/src/types/user";
import { login } from "@/src/lib/login";
import Cookies from "js-cookie";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: login,
    onSuccess: async (data) => {
      Cookies.set("user_token", data.token, {
        expires: 7, // 7日間保持
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // 環境ごとに値を分ける
      });

      await queryClient.invalidateQueries({ queryKey: ["me"] });
      
      router.push("/my-page");
    },
  });
};
