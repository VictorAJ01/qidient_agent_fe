import { bookings, calendarDates } from "./bookings.interface";
import BookingCard from "./booking_card";

export default function BookingCalender() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4-">
      {calendarDates.map((bookDate) => {
        const dateBookings = bookings.filter((b) => b.date === bookDate);
        const hasBooking = dateBookings.length > 0;

        return (
          <div
            key={bookDate}
            className="bg-light-primary-bg border border-grey-10  min-h-56"
          >
            {hasBooking ? (
              dateBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-gray-300 text-xs h-32" />
            )}
          </div>
        );
      })}
    </div>
  );
}
