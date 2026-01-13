export type Role = "user" | "super-admin" | "agent";
export type DeviceType =
  | "smartphone"
  | "tablet"
  | "desktop"
  | "laptop"
  | string;

export type SignupPayload = {
  deviceName: string;
  deviceType: DeviceType;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
};

export type SignupResponsePayload = {
  accessToken: string;
  otp: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  deviceName: string;
  deviceType: DeviceType;
};

export type LoginResponsePayload = {
  accessToken: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
};

export type User = {
  _id: string;
  email: string;
  method: string;
  status: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type OtpPayload = {
  otp: string;
};

export type OtpResponsePayload = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};

export type ResetPasswordResponsePayload = {
  isError: boolean;
  message: string;
  description: string;
  payload: null;
};

export type RequestResetPasswordPayload = {
  email: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};
