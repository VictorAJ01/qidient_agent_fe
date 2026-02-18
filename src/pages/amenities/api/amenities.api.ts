import { Api } from "../../../api";
import {
  Amenity,
  CreateAmenityRequestPayload,
  DeleteAmenityResponsePayload,
  GetAmenitiesRequestQueryParams,
  GetAmenitiesResponsePayload,
  GetAmenityRequestQueryParams,
  UpdateAmenityRequestPayload,
} from "../types/amenities.type";

const createAmenityApi = async (payload: CreateAmenityRequestPayload) => {
  const response = await Api.post<Amenity, Amenity>("/v1/amenity", payload);

  return response;
};

const getAmenitiesApi = async (params: GetAmenitiesRequestQueryParams) => {
  const response = await Api.get<
    GetAmenitiesResponsePayload,
    GetAmenitiesResponsePayload
  >("/v1/amenity", { params });

  return response;
};

const getAmenityApi = async (params: GetAmenityRequestQueryParams) => {
  const response = await Api.get<Amenity, Amenity>(`/v1/amenity/${params.id}`);

  return response;
};

const updateAmenityApi = async ({
  id,
  ...payload
}: UpdateAmenityRequestPayload) => {
  const response = await Api.patch<Amenity, Amenity>(
    `/v1/amenity/${id}`,
    payload,
  );

  return response;
};

const deleteAmenityApi = async (params: GetAmenityRequestQueryParams) => {
  const response = await Api.delete<
    DeleteAmenityResponsePayload,
    DeleteAmenityResponsePayload
  >(`/v1/amenity/${params.id}`);

  return response;
};

export {
  createAmenityApi,
  getAmenitiesApi,
  getAmenityApi,
  updateAmenityApi,
  deleteAmenityApi,
};
