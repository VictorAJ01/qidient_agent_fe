import { Button, Card, CardBody, Image, PressEvent } from "@heroui/react";
import { format } from "date-fns";
import { FaArrowRightLong } from "react-icons/fa6";

import { Property } from "../types/listings.type";

import UserStatusBadge from "@/components/general/user_status";

type PropertyCardProps = {
  onPress?: ((e: PressEvent) => void) | undefined;
} & Property;

export default function PropertyCard({
  onPress,
  ...property
}: PropertyCardProps) {
  const listedDate = property?.createdAt
    ? format(new Date(property.createdAt), "dd-MM-yy")
    : "—";

  return (
    <Card isPressable radius="sm" shadow="sm" onPress={onPress}>
      <CardBody className="relative overflow-hidden p-0">
        <Image
          alt={property?.title}
          className="object-cover"
          height={165}
          radius="sm"
          src={property?.images[0]?.url}
          width="100%"
        />

        <Button
          className="absolute z-10 top-4 right-4 bg-white/85 text-xs text-gray-700 font-medium px-4 py-2 flex items-center gap-2 shadow"
          endContent={<FaArrowRightLong />}
          radius="full"
          onPress={onPress}
        >
          View more
        </Button>
      </CardBody>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-6">
          <div className="text-left space-y-0.5">
            <h4 className="text-sm font-semibold line-clamp-1">
              {property?.title}
            </h4>
            <p className="text-xs text-gray-500 line-clamp-2">
              {property?.description}
            </p>
          </div>

          <div className="bg-blue-400 text-white text-[0.6rem] px-3 py-2 rounded-lg text-center">
            <p className="text-nowrap">Date Listed:</p>
            <p>{listedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserStatusBadge size="sm" status={property?.status} />

          <span className="bg-pink-100 capitalize text-pink-600 text-xs font-medium px-6 py-1 rounded-full">
            {property?.isRental ? "Rental" : "Sale"}
          </span>
        </div>
      </div>
    </Card>
  );
}
