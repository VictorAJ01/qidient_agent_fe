import {
  CreateBookingPayload,
  Booking,
  GetBookingsResponse,
  GetBookingsQueryParams,
  BookingByIdQueryParams,
  UpdateBookingPayload,
  RescheduleBookingPayload,
} from "../types/bookings.type";

import { Api } from "@/api";

const createBookingApi = async (payload: CreateBookingPayload) => {
  const response = await Api.post<Booking, Booking>("/v1/bookings", payload);

  return response;
};

const getBookingsApi = async (params: GetBookingsQueryParams) => {
  const response = await Api.get<GetBookingsResponse, GetBookingsResponse>(
    "/v1/bookings",
    { params },
  );

  return response;
};

const getBookingByIdApi = async (params: BookingByIdQueryParams) => {
  const response = await Api.get<Booking, Booking>(`/v1/bookings/${params.id}`);

  return response;
};

const updateBookingApi = async ({
  id,
  ...payload
}: UpdateBookingPayload & BookingByIdQueryParams) => {
  const response = await Api.put<Booking, Booking>(
    `/v1/bookings/${id}`,
    payload,
  );

  return response;
};

const cancelBookingApi = async (params: BookingByIdQueryParams) => {
  const response = await Api.put<Booking, Booking>(
    `/v1/bookings/${params.id}/cancel`,
  );

  return response;
};

const confirmBookingApi = async (params: BookingByIdQueryParams) => {
  const response = await Api.put<Booking, Booking>(
    `/v1/bookings/${params.id}/confirm`,
  );

  return response;
};

const noShowBookingApi = async (params: BookingByIdQueryParams) => {
  const response = await Api.put<Booking, Booking>(
    `/v1/bookings/${params.id}/no-show`,
  );

  return response;
};

const rescheduleBookingApi = async ({
  id,
  ...payload
}: BookingByIdQueryParams & RescheduleBookingPayload) => {
  const response = await Api.put<Booking, Booking>(
    `/v1/bookings/${id}/reschedule`,
    payload,
  );

  return response;
};

export {
  createBookingApi,
  getBookingsApi,
  getBookingByIdApi,
  updateBookingApi,
  cancelBookingApi,
  confirmBookingApi,
  noShowBookingApi,
  rescheduleBookingApi,
};
