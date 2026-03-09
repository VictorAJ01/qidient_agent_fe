import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getBookingsApi,
  cancelBookingApi,
  confirmBookingApi,
  rescheduleBookingApi,
} from "../api/bookings.api";
import {
  GetBookingsQueryParams,
  RescheduleBookingPayload,
} from "../types/bookings.type";

import { getCredentials } from "@/common";

export const useBookings = (params: Partial<GetBookingsQueryParams> = {}) => {
  const { uid } = getCredentials();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bookings", params],
    queryFn: () =>
      getBookingsApi({
        agent: uid,
        ...params,
      } as GetBookingsQueryParams),
    enabled: !!uid,
  });

  return {
    bookingsData: data,
    isLoading,
    error,
    refetch,
  };
};

export const useBookingActions = (id: string) => {
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: () => cancelBookingApi({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  const confirmMutation = useMutation({
    mutationFn: () => confirmBookingApi({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  const rescheduleMutation = useMutation({
    mutationFn: (payload: RescheduleBookingPayload) =>
      rescheduleBookingApi({ id, ...payload }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });

  return {
    cancelBooking: cancelMutation,
    confirmBooking: confirmMutation,
    rescheduleBooking: rescheduleMutation,
  };
};
