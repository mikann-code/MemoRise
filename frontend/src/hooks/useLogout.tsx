"use client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: ["me"] });
    router.push("/login");
  };

  return logout;
};