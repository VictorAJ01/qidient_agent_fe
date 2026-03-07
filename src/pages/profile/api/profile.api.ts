import {
  Agent,
  GetAgentQueryParams,
  NotificationSettingsPayload,
  UpdateAgentPayload,
} from "../types/profile.type";

import { Api } from "@/api";

const getAgentApi = async (params: GetAgentQueryParams) => {
  const response = await Api.get<Agent, Agent>("/v1/agent/profile", {
    params,
  });

  return response;
};

const updateNotificationSettingsApi = async (
  payload: NotificationSettingsPayload,
) => {
  const response = await Api.patch<Agent, Agent>(
    "/v1/agent/profile/notifications",
    payload,
  );

  return response;
};

const updateAgentApi = async (payload: UpdateAgentPayload) => {
  const response = await Api.patch<Agent, Agent>("/v1/agent/profile", payload);

  return response;
};

export { getAgentApi, updateNotificationSettingsApi, updateAgentApi };
