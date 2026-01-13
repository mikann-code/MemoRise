"use client";
import { useMutation } from "@tanstack/react-query";
import { fetchStudyWordbooks } from "@/src/lib/wordbooks";

export const useStudyWordbooks = (uuid: string) => {
  return useMutation({
    mutationFn: () => fetchStudyWordbooks(uuid),
  });
};
