import {
  GetListingsCountResponsePayload,
  GetPropertiesQueryParams,
  GetPropertiesResponse,
} from "../types/listings.type";

import { Api } from "@/api";

const getListingsCountApi = async () => {
  const response = await Api.get<
    GetListingsCountResponsePayload,
    GetListingsCountResponsePayload
  >("/v1/properties/analytics/listing-count");

  return response;
};

const getPropertiesApi = async (
  params: GetPropertiesQueryParams,
): Promise<GetPropertiesResponse> => {
  const response = await Api.get<GetPropertiesResponse, GetPropertiesResponse>(
    "/v1/properties",
    { params },
  );

  return response;
};

export { getListingsCountApi, getPropertiesApi };
