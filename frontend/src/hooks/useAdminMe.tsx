import { useQuery } from "@tanstack/react-query";
import { fetchAdminMe } from "@/src/lib/adminMe";

export const useAdminMe = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminMe"],
    queryFn: fetchAdminMe,
    retry: false,
  });

  return {
    admin: data?.user,
    isLoading,
    isError,
  };
};
