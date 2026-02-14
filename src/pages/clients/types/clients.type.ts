export type ByType = {
  buyer: number;
  seller: number;
  tenant: number;
  landlord: number;
};

export type GetClientsStatsResponsePayload = {
  totalClients: number;
  activeClients: number;
  inactiveClients: number;
  byType: ByType;
};
