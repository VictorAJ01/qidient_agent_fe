import { useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

import { Booking } from "../types/bookings.type";

import BookingCard from "./booking_card";

interface BookingCalenderProps {
  bookings: Booking[];
}

export default function BookingCalender({ bookings }: BookingCalenderProps) {
  const calendarDays = useMemo(() => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    return eachDayOfInterval({ start, end });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {calendarDays.map((date) => {
        const dayBookings = bookings.filter((b) =>
          isSameDay(new Date(b.startTime), date),
        );
        const hasBooking = dayBookings.length > 0;

        return (
          <div
            key={date.toISOString()}
            className="bg-white border border-gray-100 min-h-[200px] rounded-lg overflow-hidden shadow-sm"
          >
            <div className="bg-light-primary-bg p-2 text-center border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500">
                {format(date, "EEE")}
              </p>
              <p className="text-lg font-bold text-gray-800">
                {format(date, "d")}
              </p>
            </div>
            <div className="p-2 space-y-2">
              {hasBooking ? (
                dayBookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))
              ) : (
                <div className="flex items-center justify-center h-20 text-gray-200 text-xs">
                  Empty
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
