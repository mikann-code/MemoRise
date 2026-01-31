import { useMutation } from "@tanstack/react-query";
import { signup, SignupParams } from "@/src/lib/signup";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};