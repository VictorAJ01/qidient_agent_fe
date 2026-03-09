import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button, useDisclosure } from "@heroui/react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { Booking } from "../types/bookings.type";

import BookingDetailsDrawer from "./booking_details_drawer";
import { statusBadges } from "./bookings.interface";

import { getPropertyApi } from "@/pages/listings/api/listings.api";
import { getClientApi } from "@/pages/clients/api/clients.api";

export default function BookingCard({ booking }: { booking: Booking }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data: property } = useQuery({
    queryKey: ["property", booking.property],
    queryFn: () => getPropertyApi({ id: booking.property }),
    enabled: !!booking.property,
  });

  const { data: client } = useQuery({
    queryKey: ["client", booking.client],
    queryFn: () => getClientApi({ id: booking.client }),
    enabled: !!booking.client,
  });

  // Handle cases where status might not match statusBadges keys (e.g. pending vs confirmed)
  const statusKey =
    booking.status in statusBadges
      ? (booking.status as keyof typeof statusBadges)
      : "pending";
  const statusConfig = statusBadges[statusKey];

  const bgColor =
    booking.status === "confirmed"
      ? "bg-green-50"
      : booking.status === "cancelled"
        ? "bg-red-50"
        : booking.status === "pending"
          ? "bg-orange-50"
          : "bg-blue-50";

  return (
    <>
      <div
        className={`${bgColor} px-3 py-2 rounded-md space-y-2 border border-gray-100/50`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${statusConfig?.color}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig?.dot}`}
            />
            {statusConfig?.label}
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs text-gray-600 font-medium">
            {client ? `${client.agent}` : "Loading..."}
          </p>
          <h4 className="text-xs font-bold text-gray-900 truncate">
            {property ? property.title : "Loading..."}
          </h4>
          <p className="text-[10px] text-gray-500 italic">
            {booking.viewingType.replace("_", " ")}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-bold text-gray-700">
            {format(new Date(booking.startTime), "hh:mm a")}
          </span>
          <Button
            isIconOnly
            className="h-6 w-6"
            size="sm"
            variant="light"
            onPress={onOpen}
          >
            <HiOutlineDotsVertical
              className="cursor-pointer text-gray-400"
              size={14}
            />
          </Button>
        </div>
      </div>

      <BookingDetailsDrawer
        booking={booking}
        client={client}
        isOpen={isOpen}
        property={property}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
