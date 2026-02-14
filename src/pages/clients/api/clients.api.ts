import { GetClientsStatsResponsePayload } from "../types/clients.type";

import { Api } from "@/api";

const getClientsStatsApi =
  async (): Promise<GetClientsStatsResponsePayload> => {
    const response = await Api.get<
      GetClientsStatsResponsePayload,
      GetClientsStatsResponsePayload
    >("/v1/clients/stats");

    return response;
  };

export { getClientsStatsApi };
