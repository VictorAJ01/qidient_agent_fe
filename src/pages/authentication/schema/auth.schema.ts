import * as yup from "yup";

import { Role } from "../types/auth.type";

export const SignInSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  deviceName: yup
    .string()
    .required("Device name is required")
    .max(100, "Device name too long"),
  deviceType: yup.string().required("Device type is required"),
});

export const SignUpSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  role: yup
    .mixed<Role>()
    .oneOf(["user", "super-admin", "agent"], "Invalid role selected")
    .required("Role is required"),
  deviceName: yup.string().required("Device name is required"),
  deviceType: yup.string().required("Device type is required"),
});

export const RequestResetPasswordSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export const ResetPasswordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const VerifyOtpSchema = yup.object().shape({
  otp: yup.string().required("OTP is required"),
});

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Current password must be at least 8 characters")
    .max(100, "Current password too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least: 1 uppercase, 1 lowercase, 1 number, 1 special character",
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters")
    .max(100, "New password too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least: 1 uppercase, 1 lowercase, 1 number, 1 special character",
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export type SignInSchema = yup.InferType<typeof SignInSchema>;
export type SignUpSchema = yup.InferType<typeof SignUpSchema>;
export type RequestResetPasswordSchema = yup.InferType<
  typeof RequestResetPasswordSchema
>;
export type ResetPasswordSchema = yup.InferType<typeof ResetPasswordSchema>;
export type VerifyOtpSchema = yup.InferType<typeof VerifyOtpSchema>;
export type ChangePasswordSchema = yup.InferType<typeof ChangePasswordSchema>;
