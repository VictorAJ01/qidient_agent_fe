import {
  LoginPayload,
  LoginResponsePayload,
  OtpPayload,
  OtpResponsePayload,
  SignupPayload,
  SignupResponsePayload,
} from "../auth.type";

import { Api } from "@/api";

const loginApi = async (payload: LoginPayload) => {
  const response = await Api.post<LoginResponsePayload, LoginResponsePayload>(
    "/v1/auth/login",
    payload,
  );

  return response;
};

const signupApi = async (payload: SignupPayload) => {
  const response = await Api.post<SignupResponsePayload, SignupResponsePayload>(
    "/v1/auth/signup",
    payload,
  );

  return response;
};

const verifyOtpApi = async (payload: OtpPayload) => {
  const response = await Api.post<OtpResponsePayload, OtpResponsePayload>(
    "/v1/auth/verify-otp",
    payload,
  );

  return response;
};

export { loginApi, signupApi, verifyOtpApi };
