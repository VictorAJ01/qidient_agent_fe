import { LoginPayload, LoginResponse } from "../auth.type";

import { Api } from "@/api";

const loginApi = async (payload: LoginPayload) => {
  const response = await Api.post<LoginResponse, LoginResponse>(
    "/v1/auth/login",
    payload,
  );

  return response;
};

export { loginApi };
