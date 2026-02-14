import { Api } from "@/api";

const getClientsStatsApi = async () => {
  const response = await Api.get("/v1/clients/stats");

  return response;
};

export { getClientsStatsApi };
