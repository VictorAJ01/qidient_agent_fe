import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getLeadApi, updateLeadApi } from "../api/leads.api";
import { UpdateLeadsPayload } from "../types/leads.types";

import { getPropertyApi } from "@/pages/listings/api/listings.api";
import { getClientApi } from "@/pages/clients/api/clients.api";

export const useLeadDetails = (id: string) => {
  const queryClient = useQueryClient();

  const { data: lead, isLoading: isLeadLoading } = useQuery({
    queryKey: ["lead", id],
    queryFn: () => getLeadApi({ id }),
    enabled: !!id,
  });

  const propertyId = lead?.propertyId;
  const clientId = lead?.clientId;

  const { data: property, isLoading: isPropertyLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyApi({ id: propertyId! }),
    enabled: !!propertyId,
  });

  const { data: client, isLoading: isClientLoading } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientApi({ id: clientId! }),
    enabled: !!clientId,
  });

  const updateLeadMutation = useMutation({
    mutationFn: (payload: UpdateLeadsPayload) => updateLeadApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lead", id] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  return {
    lead,
    property,
    client,
    isLoading: isLeadLoading || isPropertyLoading || isClientLoading,
    updateLead: updateLeadMutation,
  };
};
