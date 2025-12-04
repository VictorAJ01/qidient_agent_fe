import { Button } from "@heroui/react";
import { FaRegStar } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  PiHandPointing,
  PiPencilCircleLight,
  PiBookOpenUserLight,
  PiBathtub,
} from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { BsCupHot } from "react-icons/bs";

import PropertyStats from "./property_stats";
import AmenitiesCard from "./amenities_card";
import DocumentsCard from "./documents_card";

export default function ListingDetailsPage() {
  return (
    <div className="bg-white p-4 lg:p-5 rounded-lg space-y-5">
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-semibold text-2xl">4 Bedroom Terrace Duplex</h3>
          <p className="text-sm font-medium text-black2">Jabi Abuja</p>
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
        {/* Main Image */}
        <div className="w-full rounded-3xl overflow-hidden">
          <img
            alt="Property"
            className="w-full h-[380px] md:h-[480px] object-cover"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          />
        </div>

        {/* Side Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <img
            alt="Interior"
            className="rounded-2xl object-cover h-32 md:h-40 w-full"
            src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6"
          />

          <img
            alt="Interior"
            className="rounded-2xl object-cover h-32 md:h-40 w-full"
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
          />

          {/* Last image with overlay */}
          <div className="relative rounded-2xl overflow-hidden h-32 md:h-40">
            <img
              alt="More Photos"
              className="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-medium text-lg">
              +7 Photos
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-1.5 bg-pink-200 text-pink-700 rounded-full text-sm">
            Sale
          </span>
          <span className="px-4 py-1.5 bg-red-200 text-red-700 rounded-full text-sm">
            Residential
          </span>
          <span className="px-4 py-1.5 bg-purple-200 text-purple-700 rounded-full text-sm">
            3500sq
          </span>
          <span className="px-4 py-1.5 bg-green-200 text-green-700 rounded-full text-sm">
            Duplex
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-semibold">Property Description</h2>
            <p className="text-base font-medium">
              3-bedroom duplex located in the serene and highly sought-after
              neighborhood of Jabi. Perfectly suited for families or savvy
              investors, this home offers a blend of modern architecture and
              functional living.
            </p>
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
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AmenitiesCard Icon={TbAirConditioning} title="Air Conditioner" />
              <AmenitiesCard Icon={BsCupHot} title="Hot water" />
              <AmenitiesCard Icon={PiBathtub} title="Bathtub" />
            </div>
          </div>

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
