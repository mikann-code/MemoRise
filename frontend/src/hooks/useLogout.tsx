"use client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    Cookies.remove("user_token");
    queryClient.removeQueries({ queryKey: ["me"] });
    router.push("/login");
  };

  return logout;
};