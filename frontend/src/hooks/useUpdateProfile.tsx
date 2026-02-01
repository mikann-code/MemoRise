"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, UpdateProfileParams, UpdateProfileResponse } from "@/src/lib/profile";

export function useUpdateProfile() {
  const qc = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileParams>({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      qc.setQueryData(["me"], updatedUser);
    },
  });
}
