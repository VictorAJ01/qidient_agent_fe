import * as yup from "yup";

export type AmenityFormValues = {
  name: string;
  description?: string;
  icon?: string;
};

export const amenitySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  description: yup.string().optional(),
  icon: yup.string().optional(),
});
