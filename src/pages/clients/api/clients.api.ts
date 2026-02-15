import {
  Client,
  GetClientRequestQueryParams,
  GetClientsRequestQueryParams,
  GetClientsResponsePayload,
  GetClientsStatsResponsePayload,
} from "../types/clients.type";

import { Api } from "@/api";

const getClientsStatsApi = async () => {
  const response = await Api.get<
    GetClientsStatsResponsePayload,
    GetClientsStatsResponsePayload
  >("/v1/clients/stats");

  return response;
};

const getClientsApi = async (params: GetClientsRequestQueryParams) => {
  const response = await Api.get<
    GetClientsResponsePayload,
    GetClientsResponsePayload
  >("/v1/clients", { params });

  return response;
};

const getClientApi = async (params: GetClientRequestQueryParams) => {
  const response = await Api.get<Client, Client>(`/v1/clients/${params.id}`);

  return response;
};

export { getClientApi, getClientsApi, getClientsStatsApi };
