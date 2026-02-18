import { Api } from ".";

import { PaginationMeta } from "@/types";

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

const getAmenitiesApi = async (params: GetAmenitiesRequestQueryParams) => {
  const response = await Api.get<
    GetAmenitiesResponsePayload,
    GetAmenitiesResponsePayload
  >("/v1/amenity", { params });

  return response;
};

export { getAmenitiesApi };
