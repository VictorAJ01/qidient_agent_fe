import { PaginationMeta } from "@/types";

export type ClientType = {
  buyer: number;
  seller: number;
  tenant: number;
  landlord: number;
};

export type GetClientsStatsResponsePayload = {
  totalClients: number;
  activeClients: number;
  inactiveClients: number;
  byType: ClientType;
};

export type ClientStatus = "active" | "inactive";

export type GetClientsRequestQueryParams = {
  status: ClientStatus;
};

export type Client = {
  _id: string;
  agent: string;
  user: string;
  clientType: "buyer" | "seller" | "tenant" | "landlord";
  status: ClientStatus;
  properties: string[];
  documents: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetClientsResponsePayload = {
  clients: Client[];
  meta: PaginationMeta;
};
