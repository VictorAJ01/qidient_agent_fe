import {
  CreatePropertyPayload,
  GetListingsCountResponsePayload,
  GetPropertiesQueryParams,
  GetPropertiesResponse,
  GetPropertyQueryParams,
  GetPropertyResponsePayload,
} from "../types/listings.type";

import { Api } from "@/api";

const getListingsCountApi = async () => {
  const response = await Api.get<
    GetListingsCountResponsePayload,
    GetListingsCountResponsePayload
  >("/v1/properties/analytics/listing-count");

  return response;
};

const createPropertyApi = async (payload: CreatePropertyPayload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "images" && Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          formData.append("images", item);
        }
      });
    } else if (
      (key === "amenities" || key === "features" || key === "tags") &&
      Array.isArray(value)
    ) {
      value.forEach((v) => {
        if (v != null && v !== "") formData.append(key, String(v));
      });
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  const response = await Api.post("/v1/properties", formData);

  return response;
};

const getPropertiesApi = async (
  params: GetPropertiesQueryParams,
): Promise<GetPropertiesResponse> => {
  const response = await Api.get<GetPropertiesResponse, GetPropertiesResponse>(
    "/v1/properties/my",
    { params },
  );

  return response;
};

const getPropertyApi = async (params: GetPropertyQueryParams) => {
  const response = await Api.get<
    GetPropertyResponsePayload,
    GetPropertyResponsePayload
  >(`/v1/properties/${params.id}`);

  return response;
};

export {
  getListingsCountApi,
  getPropertiesApi,
  getPropertyApi,
  createPropertyApi,
};
