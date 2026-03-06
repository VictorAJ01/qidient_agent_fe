import {
  LoginPayload,
  LoginResponsePayload,
  SignupPayload,
  SignupResponsePayload,
  OtpPayload,
  OtpResponsePayload,
  RequestResetPasswordPayload,
  ResetPasswordPayload,
  ResetPasswordResponsePayload,
  ChangePasswordPayload,
  ResendOtpPayload,
} from "../types/auth.type";

import { Api } from "@/api";

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

const resendOtpApi = async (payload: ResendOtpPayload) => {
  const response = await Api.post<SignupResponsePayload, SignupResponsePayload>(
    "/v1/auth/resend-otp",
    payload,
  );

  return response;
};

const loginApi = async (payload: LoginPayload) => {
  const response = await Api.post<LoginResponsePayload, LoginResponsePayload>(
    "/v1/auth/login",
    payload,
  );

  return response;
};

const requestResetPasswordApi = async (
  payload: RequestResetPasswordPayload,
) => {
  const response = await Api.post<SignupResponsePayload, SignupResponsePayload>(
    "/v1/auth/reset-password/request",
    payload,
  );

  return response;
};

const resetPasswordApi = async (payload: ResetPasswordPayload) => {
  const response = await Api.patch<
    ResetPasswordResponsePayload,
    ResetPasswordResponsePayload
  >("/v1/auth/reset-password", payload);

  return response;
};

const changePasswordApi = async (payload: ChangePasswordPayload) => {
  const response = await Api.patch<LoginResponsePayload, LoginResponsePayload>(
    "/v1/auth/change-password",
    payload,
  );

  return response;
};

export {
  signupApi,
  verifyOtpApi,
  resendOtpApi,
  loginApi,
  requestResetPasswordApi,
  resetPasswordApi,
  changePasswordApi,
};
