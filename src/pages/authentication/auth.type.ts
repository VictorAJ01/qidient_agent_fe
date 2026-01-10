export type LoginResponsePayload = {
  token: string;
  userId: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  deviceName: string;
  deviceType: "smartphone" | "tablet" | "desktop" | "laptop" | string;
};

export type LoginResponse = {
  accessToken: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: "user" | "admin" | "agent";
};

export type AuthResponsePayload = {
  accessToken: string;
  otp: string;
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};
