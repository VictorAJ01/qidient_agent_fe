import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";


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
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <>
            <DrawerHeader className="pt-8 flex  justify-between items-center gap-1">
              <h3 className="text-xl text-black"> Bookings Details</h3>
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

                <div>
                  
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat
                consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
                et. Culpa deserunt nostrud ad veniam.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </DrawerFooter>
          </>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
