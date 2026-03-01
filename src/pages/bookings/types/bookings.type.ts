export type BookingViewingType = "in_person" | "virtual";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "no_show"
  | "completed";

export type CreateBookingPayload = {
  property: string;
  agent: string;
  client: string;
  lead?: string;
  viewingType: BookingViewingType;
  startTime: string;
  endTime: string;
  notes?: string;
  totalPrice?: number;
};

export type Booking = {
  _id: string;
  property: string;
  agent: string;
  client: string;
  lead?: string;
  viewingType: BookingViewingType;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  notes?: string;
  totalPrice?: number;
};

export type GetBookingsQueryParams = {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  agent?: string;
  client?: string;
  property?: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type GetBookingsResponse = {
  bookings: Booking[];
  meta: PaginationMeta;
};

export type BookingByIdQueryParams = {
  id: string;
};

export interface UpdateBookingPayload extends CreateBookingPayload {
  status: BookingStatus;
}

export type RescheduleBookingPayload = {
  startTime: string;
  endTime: string;
};
