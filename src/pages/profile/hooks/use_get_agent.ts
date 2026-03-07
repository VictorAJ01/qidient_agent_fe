import { useQuery } from "@tanstack/react-query";

import { getAgentApi } from "../api/profile.api";

import { queryKeys } from "@/utils/keys";
import { getCredentials } from "@/common";

export const useGetAgent = () => {
  const { uid } = getCredentials();

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: [queryKeys.agent],
    queryFn: () => getAgentApi({ id: uid }),
    enabled: !!uid,
    staleTime: 5 * 60 * 1000,
  });

  return {
    agent: data,
    isPending,
    isError,
    error,
    isSuccess,
  };
};
