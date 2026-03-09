import { useQuery } from "@tanstack/react-query";

import { getLeadsApi, getLeadApi } from "../api/leads.api";
import { GetLeadsQueryParams } from "../types/leads.types";

import { getCredentials } from "@/common";

export const useLeads = (params: Partial<GetLeadsQueryParams> = {}) => {
  const { uid } = getCredentials();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["leads", params],
    queryFn: () =>
      getLeadsApi({
        agentId: uid,
        ...params,
      } as GetLeadsQueryParams),
    enabled: !!uid,
  });

  return {
    leadsData: data,
    isLoading,
    error,
    refetch,
  };
};

export const useLead = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["lead", id],
    queryFn: () => getLeadApi({ id }),
    enabled: !!id,
  });

  return {
    lead: data,
    isLoading,
    error,
    refetch,
  };
};
