import { GetListingsCountResponsePayload } from "../types/listings.type";

import { Api } from "@/api";

const getListingsCountApi = async () => {
  const response = await Api.get<
    GetListingsCountResponsePayload,
    GetListingsCountResponsePayload
  >("/v1/properties/analytics/listing-count");

  return response;
};

export { getListingsCountApi };
