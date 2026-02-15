import { Button, Chip } from "@heroui/react";
import { FaRegStar } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import {
  PiHandPointing,
  PiPencilCircleLight,
  PiBookOpenUserLight,
} from "react-icons/pi";
import { TbTools } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PropertyStats from "./components/property_stats";
import DocumentsCard from "./components/documents_card";
import { getPropertyApi } from "./api/listings.api";
import { PropertyImage } from "./types/listings.type";

import { queryKeys } from "@/utils/keys";
import Loader from "@/components/general/loader";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const propertyId = id as string;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: property, isLoading } = useQuery({
    queryKey: [queryKeys.listing, propertyId],
    queryFn: () => getPropertyApi({ id: propertyId }),
  });

  const propertyAmenities = (property?.amenities ?? [])
    .map((item): { name: string; icon?: string } => {
      if (typeof item === "object" && item !== null && "name" in item) {
        const o = item as { name: string; icon?: string };

        return { name: o.name, icon: o.icon };
      }

      return { name: String(item) };
    })
    .filter((a) => a.name.trim() !== "");

  if (isLoading) {
    return (
      <div className="min-h-[280px] flex items-center justify-center">
        <Loader message="Loading listing details..." />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 lg:p-5 rounded-lg space-y-5">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-6 xl:gap-8 flex-wrap xl:flex-nowrap justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {property?.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {property?.address}, {property?.city}, {property?.state},{" "}
            {property?.country}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="text-xs font-normal"
            color="primary"
            radius="sm"
            startContent={<FaRegStar />}
          >
            Feature
          </Button>
          <Button
            className="text-xs font-normal bg-qidient-orange text-qidient-orange-text"
            radius="sm"
          >
            Mark as sold
          </Button>
          <Button
            className="text-xs font-normal bg-qidient-orange text-qidient-orange-text"
            radius="sm"
          >
            Activate
          </Button>
          <Button
            className="text-xs font-normal bg-qidient-orange text-qidient-orange-text"
            radius="sm"
            startContent={<RiPencilLine />}
          >
            Edit
          </Button>
          <Button
            className="text-xs font-normal bg-qidient-light-red/73 text-qidient-red-text"
            radius="sm"
            startContent={<FiTrash2 />}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="w-full space-y-4">
        {/* Images: 1–10 images, main + thumbnails */}
        {(() => {
          const images: PropertyImage[] = property?.images ?? [];
          const imageUrls = images.map((img) =>
            typeof img === "string" ? img : img.url,
          );
          const count = imageUrls.length;
          const mainUrl = imageUrls[selectedImageIndex] ?? imageUrls[0];
          const hasThumbnails = count > 1;

          if (count === 0) {
            return (
              <div className="rounded-lg h-80 bg-gray-100 flex items-center justify-center text-gray-500 mb-6">
                No images
              </div>
            );
          }

          return (
            <div
              className={`grid gap-4 mb-6 ${hasThumbnails ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1"}`}
            >
              <div className={hasThumbnails ? "md:col-span-3" : ""}>
                <img
                  alt={property?.title ?? "Property"}
                  className="rounded-lg w-full h-80 object-cover"
                  src={mainUrl}
                />
              </div>
              {hasThumbnails && (
                <div className="flex flex-row md:flex-col gap-2 md:gap-4 md:max-h-80 md:overflow-y-auto">
                  {imageUrls.map((url, i) => (
                    <button
                      key={i}
                      className={`rounded-lg h-20 md:h-24 w-full min-w-[5rem] md:min-w-0 flex-shrink-0 overflow-hidden border-2 transition ${
                        selectedImageIndex === i
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                    >
                      <img
                        alt=""
                        className="w-full h-full object-cover"
                        src={url}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        <div className="flex flex-wrap gap-3">
          <Chip
            className="px-2 capitalize"
            color="danger"
            size="sm"
            variant="flat"
          >
            {property?.isRental ? "Rental" : "Sale"}
          </Chip>
          <Chip
            className="px-2 capitalize"
            color="danger"
            size="sm"
            variant="flat"
          >
            {property?.type}
          </Chip>
          <Chip className="px-2" color="danger" size="sm" variant="flat">
            {property?.size}sqft
          </Chip>
          <Chip
            className="px-2 capitalize"
            color="success"
            size="sm"
            variant="flat"
          >
            {property?.category}
          </Chip>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-semibold">Property Description</h2>
            <p className="text-base font-medium">{property?.description}</p>
          </div>

          <div className="border-1 border-primary rounded-xl p-4 lg:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <PropertyStats
              Icon={IoPersonCircleOutline}
              figure="157,367"
              title="Total Views"
            />
            <PropertyStats
              Icon={PiHandPointing}
              figure="9,741"
              title="Clicks"
            />
            <PropertyStats
              Icon={PiPencilCircleLight}
              figure="9.73%"
              title="Conversion Rate"
            />
            <PropertyStats
              Icon={PiBookOpenUserLight}
              figure="81.94%"
              title="Bounce Rate"
            />
          </div>
        </div>

        <div className="space-y-4">
          {propertyAmenities.length > 0 && (
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-2xl font-semibold">Amenities</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {propertyAmenities.map((amenity, index) => (
                  <div
                    key={`${amenity.name}-${index}`}
                    className="bg-blue-50 border border-blue-100 rounded-2xl flex-1 min-w-[150px]"
                  >
                    <div className="flex pt-3 gap-4 px-6 py-3">
                      {amenity.icon && amenity.icon.length <= 4 ? (
                        <span className="text-2xl" title={amenity.icon}>
                          {amenity.icon}
                        </span>
                      ) : (
                        <TbTools className="text-2xl mt-0.5 flex-shrink-0 text-blue-600" />
                      )}
                      <p className="py-2 text-gray-800 font-medium truncate">
                        {amenity.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DocumentsCard title="Deed of Assignment" />
              <DocumentsCard title="Floor plan" />
              <DocumentsCard title="Floor plan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
