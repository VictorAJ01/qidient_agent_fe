import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  User,
  Image,
  Divider,
  Card,
  CardBody,
} from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { format } from "date-fns";

import { Booking } from "../types/bookings.type";
import { useBookingActions } from "../hooks/use_bookings";

import { statusBadges } from "./bookings.interface";

interface BookingDetailsDrawerProps {
  booking: Booking | null;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  client?: any;
  property?: any;
}

export default function BookingDetailsDrawer({
  booking,
  isOpen,
  onOpenChange,
  onClose,
  client,
  property,
}: BookingDetailsDrawerProps) {
  const { cancelBooking, confirmBooking } = useBookingActions(
    booking?._id || "",
  );

  const statusKey =
    booking?.status && booking.status in statusBadges
      ? (booking.status as keyof typeof statusBadges)
      : "pending";
  const statusConfig = statusBadges[statusKey];

  return (
    <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {() => (
          <>
            <Button
              isIconOnly
              className="mt-4 ml-4"
              variant="light"
              onPress={onClose}
            >
              <IoMdClose className="text-grey text-2xl" />
            </Button>
            <DrawerHeader className="pt-4 flex justify-between items-center gap-1">
              <h3 className="text-xl text-black font-rubik">
                Bookings Details
              </h3>
              {statusConfig && (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2 ${statusConfig.color}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full capitalize ${statusConfig.dot}`}
                  />
                  {statusConfig.label}
                </span>
              )}
            </DrawerHeader>
            <DrawerBody>
              <div className="py-4 space-y-4">
                <div>
                  <User
                    avatarProps={{
                      src:
                        client?.avatar ||
                        "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    description={client?.phoneNumber || "No phone"}
                    name={
                      client
                        ? `${client.firstName} ${client.lastName}`
                        : "Loading..."
                    }
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <Image
                    alt="Property"
                    className="object-cover rounded-lg"
                    height={100}
                    src={
                      property?.images?.[0] ||
                      "https://heroui.com/images/hero-card-complete.jpeg"
                    }
                    width={100}
                  />
                  <div>
                    <p className="text-lg text-grey font-medium font-rubik">
                      {property?.name || "Loading property..."}
                    </p>
                    <p className="text-xs text-gray-500">
                      {property?.address?.city}
                    </p>
                  </div>
                </div>

                <div className="py-2">
                  <p className="text-sm text-grey leading-relaxed">
                    {property?.description ||
                      "No description available for this property."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base text-grey leading-relaxed">
                  Viewing type:{" "}
                  <span className="font-semibold">
                    {booking?.viewingType.replace("_", " ")}
                  </span>
                </p>

                <div className="bg-primary/10 py-3 text-primary text-base text-center font-bold rounded-lg">
                  {booking ? format(new Date(booking.startTime), "PPp") : "-"}
                </div>
              </div>

              <Divider className="my-4" />

              <div>
                <Card
                  className="p-2 rounded-lg border-none bg-gray-50"
                  shadow="none"
                >
                  <CardBody className="space-y-3">
                    {booking?.status === "pending" && (
                      <Button
                        className="w-full font-medium"
                        color="success"
                        isLoading={confirmBooking.isPending}
                        radius="sm"
                        variant="solid"
                        onPress={() => confirmBooking.mutate()}
                      >
                        Confirm booking
                      </Button>
                    )}

                    <Button
                      className="w-full font-medium"
                      color="primary"
                      radius="sm"
                      variant="flat"
                    >
                      Reschedule
                    </Button>

                    {booking?.status !== "cancelled" && (
                      <Button
                        className="w-full font-medium"
                        color="danger"
                        isLoading={cancelBooking.isPending}
                        radius="sm"
                        variant="flat"
                        onPress={() => cancelBooking.mutate()}
                      >
                        Cancel Booking
                      </Button>
                    )}

                    <Button
                      className="w-full font-medium"
                      color="default"
                      radius="sm"
                      variant="flat"
                    >
                      Message Client
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
