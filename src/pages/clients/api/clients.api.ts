import {
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

export { getClientsApi, getClientsStatsApi };
