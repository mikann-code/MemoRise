"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AdminLoginParams, AdminLoginResponse } from "@/src/types/user";
import { adminLogin } from "@/src/lib/login";

export const useAdminLogin = () => {
  const router = useRouter();

  return useMutation<AdminLoginResponse, Error, AdminLoginParams>({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      Cookies.set("admin_token", data.token, {
        expires: 7, // 7日間保持
        sameSite: "strict",
        secure: true,
      });

      // admin は user の me を持たないので invalidate しない
      router.push("/admin");
    },
  });
};
