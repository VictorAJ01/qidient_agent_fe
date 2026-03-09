import {
  LeadSuccessMessagePayload,
  GetLeadQueryParams,
  GetLeadsQueryParams,
  GetLeadsResponsePayload,
  Lead,
  UpdateLeadsPayload,
  GetLeadsAnalyticsSourceResponsePayload,
  GetLeadByClientIdQueryParams,
  GetLeadByPropertyIdQueryParams,
} from "../types/leads.types";

import { Api } from "@/api";

const getLeadsApi = async (params: GetLeadsQueryParams) => {
  const response = await Api.get<
    GetLeadsResponsePayload,
    GetLeadsResponsePayload
  >("/v1/leads", { params });

  return response;
};

const getLeadApi = async (params: GetLeadQueryParams) => {
  const response = await Api.get<Lead, Lead>("/v1/leads", { params });

  return response;
};

const updateLeadApi = async ({ id, ...payload }: UpdateLeadsPayload) => {
  const response = await Api.put<Lead, Lead>(`/v1/leads/${id}`, payload);

  return response;
};

const deleteLeadApi = async ({ id }: GetLeadQueryParams) => {
  const response = await Api.delete<
    LeadSuccessMessagePayload,
    LeadSuccessMessagePayload
  >(`/v1/leads/${id}`);

  return response;
};

const resetUnreadLeadApi = async ({ id }: GetLeadQueryParams) => {
  const response = await Api.delete<
    LeadSuccessMessagePayload,
    LeadSuccessMessagePayload
  >(`/v1/leads/${id}/reset-unread`);

  return response;
};

const getLeadsAnalyticsSourceApi = async () => {
  const response = await Api.get<
    GetLeadsAnalyticsSourceResponsePayload,
    GetLeadsAnalyticsSourceResponsePayload
  >("/v1/leads/analytics/sources");

  return response;
};

const getLeadByClientIdApi = async (params: GetLeadByClientIdQueryParams) => {
  const response = await Api.get<
    GetLeadsResponsePayload,
    GetLeadsResponsePayload
  >(`/v1/leads/client/${params.clientId}`);

  return response;
};

const getLeadByPropertyIdApi = async (
  params: GetLeadByPropertyIdQueryParams,
) => {
  const response = await Api.get<
    GetLeadsResponsePayload,
    GetLeadsResponsePayload
  >(`/v1/leads/property/${params.propertyId}`);

  return response;
};

const getHotLeadsApi = async (params: GetLeadsQueryParams) => {
  const response = await Api.get<
    GetLeadsResponsePayload,
    GetLeadsResponsePayload
  >("/v1/leads/hot", { params });

  return response;
};

export {
  getLeadsApi,
  getLeadApi,
  updateLeadApi,
  deleteLeadApi,
  resetUnreadLeadApi,
  getLeadsAnalyticsSourceApi,
  getLeadByClientIdApi,
  getLeadByPropertyIdApi,
  getHotLeadsApi,
};
