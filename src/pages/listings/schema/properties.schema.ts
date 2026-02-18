import * as yup from "yup";

export const createPropertySchema = yup.object({
  title: yup
    .string()
    .min(10, "Title must be at least 10 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .required("Description is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  type: yup.string().required("Property type is required"),
  bedrooms: yup
    .number()
    .integer("Bedrooms must be a whole number")
    .min(0, "Bedrooms cannot be negative")
    .required("Number of bedrooms is required"),
  bathrooms: yup
    .number()
    .integer("Bathrooms must be a whole number")
    .min(0, "Bathrooms cannot be negative")
    .required("Number of bathrooms is required"),
  images: yup
    .array()
    .of(yup.mixed().required())
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed")
    .required("Images are required"),
  amenities: yup.array().of(yup.string().defined()).optional(),
  status: yup.string().required("Property status is required"),
  isRental: yup
    .boolean()
    .required("Please specify if property is for rent or sale"),
  category: yup.string().required("Property category is required"),
  size: yup
    .number()
    .positive("Size must be a positive number")
    .required("Property size is required"),
  yearBuilt: yup
    .number()
    .integer("Year must be a whole number")
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .nullable()
    .optional(),
  address: yup.string().required("Property address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  features: yup.array().of(yup.string().defined()).optional(),
  tags: yup.array().of(yup.string().defined()).optional(),
  slug: yup.string().nullable().optional(),
});

export type CreatePropertyPayload = yup.InferType<typeof createPropertySchema>;
