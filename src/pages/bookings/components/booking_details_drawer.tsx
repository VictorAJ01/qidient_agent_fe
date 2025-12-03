import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { Card, CardBody } from "@heroui/react";
import { IoMdClose } from "react-icons/io";

import { BookingI, statusBadges } from "./bookings.interface";

interface BookingDetailsDrawerI {
  booking: BookingI | null;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
export default function BookingDetailsDrawer({
  booking,
  isOpen,
  onOpenChange,
  onClose,
}: BookingDetailsDrawerI) {
  const statusConfig = booking ? statusBadges[booking.status] : null;

  return (
    <div>
      <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <>
            <Button
              isIconOnly
              className="pl-4"
              variant="light"
              onPress={onClose}
            >
              <IoMdClose className="text-grey text-2xl" />
            </Button>
            <DrawerHeader className="pt-4 flex  justify-between items-center gap-1">
              <h3 className="text-xl text-black font-rubik">
                {" "}
                Bookings Details
              </h3>
              {statusConfig && (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2  ${statusConfig.color}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full capitalize animate-ping ${statusConfig.dot}`}
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
                      src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    description="+234 00949 8340"
                    name={booking?.name}
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <Image
                    alt="HeroUI hero Image"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={100}
                  />
                  <div>
                    <p className="text-2xl text-grey font-medium font-rubik">
                      {booking?.property}
                    </p>
                  </div>
                </div>

                <div className="py-2">
                  <p className="text-sm text-grey leading-relaxed">
                    3-bedroom duplex located in the serene and highly
                    sought-after neighborhood of Jabi. Perfectly suited for
                    families or savvy investors, this home offers a blend of
                    modern architecture and functional living.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base text-grey leading-relaxed">
                  Viewing type: {booking?.type}
                </p>

                <div className="bg-grey py-3  text-white text-base text-center font-semibold rounded-lg w-3/4">
                  {booking?.time} | {booking?.date}-05-2025
                </div>
              </div>

              <Divider className="my-4" />

              <div>
                <Card className="p-2 rounded-lg border-none" shadow="none">
                  <CardBody className="space-y-3">
                    <Button
                      className="w-full font-medium font-rubik"
                      color="success"
                      radius="sm"
                      variant="flat"
                    >
                      Confirm booking
                    </Button>

                    <Button
                      className="w-full font-medium font-rubik"
                      color="success"
                      radius="sm"
                      variant="flat"
                    >
                      Reschedule
                    </Button>

                    <Button
                      className="w-ful font-medium font-rubik"
                      color="success"
                      radius="sm"
                      variant="flat"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-full font-medium font-rubik"
                      color="success"
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
        </DrawerContent>
      </Drawer>
    </div>
  );
}
