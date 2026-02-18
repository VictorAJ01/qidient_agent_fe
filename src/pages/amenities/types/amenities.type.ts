import { PaginationMeta } from "@/types";

export type CreateAmenityRequestPayload = {
  name: string;
  description?: string;
  icon?: string;
};

export type Amenity = {
  _id: string;
  name: string;
  icon?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAmenitiesRequestQueryParams = {
  page?: number;
  limit?: number;
};

export type GetAmenitiesResponsePayload = {
  amenities: Amenity[];
  meta: PaginationMeta;
};

export type GetAmenityRequestQueryParams = {
  id: string;
};

export type UpdateAmenityRequestPayload = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
};

export type DeleteAmenityResponsePayload = {
  message: string;
};
