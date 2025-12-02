import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FaCalendarDays } from "react-icons/fa6";
import { FiPlus, FiSearch } from "react-icons/fi";

export default function BookingsPage() {
  return (
    <div className="py-4 space-y-3">
      <div className="w-full bg-white py-4 px-5 lg:px-7 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
          <h4 className="text-base font-medium text-black">
            All Bookings <span className="text-primary">(50)</span>
          </h4>

          <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
            <Input
              className="w-full md:min-w-3xs xl:min-w-xs"
              endContent={<FiSearch className="text-gray-400 text-xl" />}
              placeholder="Search by name, property or keyword"
              radius="full"
              size="md"
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
          >
            New Booking
          </Button>
        </div>
      </div>

      <div>calender here</div>
    </div>
  );
}
