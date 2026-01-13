import { useQuery } from "@tanstack/react-query";

import { getUserApi } from "../api/profile.api";

import { queryKeys } from "@/utils/keys";

export const useGetUser = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: getUserApi,
  });

  return {
    user: data,
    isPending,
    isError,
    error,
    isSuccess,
  };
};
