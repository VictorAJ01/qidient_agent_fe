import * as yup from "yup";

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
});

export const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const VerifyOtpSchema = yup.object().shape({
  otp: yup.string().required("OTP is required"),
});

export type SignInSchema = yup.InferType<typeof SignInSchema>;
export type SignUpSchema = yup.InferType<typeof SignUpSchema>;
export type ResetPasswordSchema = yup.InferType<typeof ResetPasswordSchema>;
export type VerifyOtpSchema = yup.InferType<typeof VerifyOtpSchema>;
