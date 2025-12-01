import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
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

export type SignInSchema = yup.InferType<typeof SignInSchema>;
export type SignUpSchema = yup.InferType<typeof SignUpSchema>;
