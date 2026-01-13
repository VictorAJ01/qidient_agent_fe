import {
  GetUserResponsePayload,
  NotificationSettingsPayload,
} from "../types/profile.type";

import { Api } from "@/api";

const getUserApi = async () => {
  const response = await Api.get<
    GetUserResponsePayload,
    GetUserResponsePayload
  >("/v1/user/me");

  return response;
};

const updateNotificationSettingsApi = async (
  payload: NotificationSettingsPayload,
): Promise<GetUserResponsePayload> => {
  const response = await Api.patch("/v1/user/profile/notifications", payload);

  return response.data;
};

export { getUserApi, updateNotificationSettingsApi };
