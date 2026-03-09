import { Button } from "@heroui/button";
import { Input, Spinner } from "@heroui/react";
import { FaCalendarDays } from "react-icons/fa6";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useState } from "react";

import BookingCalender from "./components/booking_calender";
import { useBookings } from "./hooks/use_bookings";
import CreateBookingModal from "./components/create_booking_modal";

import { getCredentials } from "@/common";

export default function BookingsPage() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { uid } = getCredentials();

  const { bookingsData, isLoading } = useBookings();

  return (
    <div className="py-4 space-y-3">
      <div className="w-full bg-white py-4 px-5 lg:px-7 overflow-hidden rounded-lg">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
          <h4 className="text-base font-medium text-black">
            All Bookings{" "}
            <span className="text-primary">
              ({bookingsData?.meta?.total || 0})
            </span>
          </h4>

          <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
            <Input
              className="w-full md:min-w-3xs xl:min-w-xs"
              endContent={<FiSearch className="text-gray-400 text-xl" />}
              placeholder="Search by name, property or keyword"
              radius="full"
              size="md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Button
              className="bg-grey text-white shrink-0"
              radius="sm"
              size="md"
              startContent={<FaCalendarDays className="text-white text-lg " />}
            >
              Filter by Date
            </Button>
          </div>

          <Button
            className="shrink-0"
            color="primary"
            radius="sm"
            size="md"
            startContent={<FiPlus className="text-lg" />}
            onPress={() => setIsModalOpen(true)}
          >
            New Booking
          </Button>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner label="Loading Bookings..." />
          </div>
        ) : (
          <BookingCalender bookings={bookingsData?.bookings || []} />
        )}
      </div>

      <CreateBookingModal
        agentId={uid}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
