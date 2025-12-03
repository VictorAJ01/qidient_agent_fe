import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "@heroui/button";

import { BookingI, statusBadges } from "./bookings.interface";

export default function BookingCard({ booking }: { booking: BookingI }) {
  const statusConfig = statusBadges[booking.status];

  return (
    <div className={`${booking.backgroundColor} px-3 py-2 h-full space-y-6`}>
      <div className="flex items-center justify-between py-2">
        <h3 className="text-2xl  text-black">{booking.date}</h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2 ${statusConfig.color}`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-ping ${statusConfig.dot}`}
          />
          {statusConfig.label}
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-grey">{booking.name}</p>
        <h4 className="text-sm font-bold text-black">{booking.property}</h4>
        <p className="text-xs text-grey">{booking.type}</p>
      </div>

      <div className="flex items-center justify-between pt-3">
        <span className="text-sm font-semibold text-grey">{booking.time}</span>
        <Button isIconOnly size="sm" variant="light">
          <HiOutlineDotsVertical
            className="cursor-pointer text-grey"
            size={20}
          />
        </Button>
      </div>
    </div>
  );
}
