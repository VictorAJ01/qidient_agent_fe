import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
  phone: yup.string().required("Phone Number is required"),
  aboutMe: yup
    .string()
    .required("About me is required")
    .min(50, "About me must be at least 50 characters")
    .max(1000, "About me must be at most 1000 characters"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
});

export type EditProfileSchema = yup.InferType<typeof editProfileSchema>;
