import { Select, SelectItem, Input, Button } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";

import PropertyCard from "./components/property_card";

import { sidebarRoutes } from "@/routes";

const statuses = ["Active", "Inactive", "Pending"];

const properties = [
  {
    id: 1,
    propertyImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Muoyo’s Place, Guzape",
    description: "4 Bedroom Terrace Duplex, Jabi Abuja",
    status: "active",
    dateListed: "24-05-25",
    listingType: "sale",
  },
  {
    id: 2,
    propertyImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
    title: "Emerald Heights, Lekki",
    description: "3 Bedroom Apartment, Lekki Phase 1, Lagos",
    status: "active",
    dateListed: "18-05-25",
    listingType: "rent",
  },
  {
    id: 3,
    propertyImage:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    title: "Sunset Villas, Asokoro",
    description: "5 Bedroom Luxury Detached Duplex, Abuja",
    status: "inactive",
    dateListed: "12-05-25",
    listingType: "sale",
  },
  {
    id: 4,
    propertyImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    title: "Palm Court Residence",
    description: "2 Bedroom Flat, Ikoyi Lagos",
    status: "active",
    dateListed: "30-04-25",
    listingType: "rent",
  },
  {
    id: 5,
    propertyImage:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    title: "Greenfield Estate, Gwarinpa",
    description: "4 Bedroom Semi-Detached Duplex, Abuja",
    status: "active",
    dateListed: "22-04-25",
    listingType: "sale",
  },
  {
    id: 6,
    propertyImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    title: "Ocean View Apartments",
    description: "1 Bedroom Shortlet Apartment, Victoria Island",
    status: "inactive",
    dateListed: "15-04-25",
    listingType: "rent",
  },
  {
    id: 7,
    propertyImage:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    title: "Royal Crest Homes, Wuye",
    description: "3 Bedroom Terrace Duplex, Wuye Abuja",
    status: "active",
    dateListed: "08-04-25",
    listingType: "sale",
  },
  {
    id: 8,
    propertyImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    title: "Cityline Residences, Yaba",
    description: "Studio Apartment, Yaba Lagos",
    status: "active",
    dateListed: "01-04-25",
    listingType: "rent",
  },
];

export default function ListingsPage() {
  const navigate = useNavigate();

  const handleViewProperty = (id: string | number) =>
    navigate(`${sidebarRoutes.listings}/${id}`);

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
          <Input
            className="w-full md:min-w-3xs xl:min-w-sm"
            endContent={<FiSearch className="text-gray-400 text-xl" />}
            placeholder="Search by name, ID or email"
            radius="full"
          />
          <Select
            className="lg:min-w-24 xl:min-w-28"
            color="primary"
            defaultSelectedKeys={["active"]}
            radius="sm"
          >
            {statuses.map((status) => (
              <SelectItem key={status.toLowerCase()}>{status}</SelectItem>
            ))}
          </Select>
          <Select
            className="lg:min-w-24 xl:min-w-28"
            defaultSelectedKeys={["duplex"]}
            radius="sm"
          >
            {["Duplex", "Bungalow"].map((type) => (
              <SelectItem key={type.toLowerCase()}>{type}</SelectItem>
            ))}
          </Select>
          <Select
            className="lg:min-w-24 xl:min-w-28"
            defaultSelectedKeys={["rent"]}
            radius="sm"
          >
            {["Rent", "Lease", "Sale"].map((type) => (
              <SelectItem key={type.toLowerCase()}>{type}</SelectItem>
            ))}
          </Select>
        </div>

        <Button
          className="py-5"
          color="primary"
          radius="sm"
          startContent={<IoAddOutline className="text-lg" />}
        >
          Add new listing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {properties.map((property) => (
          <PropertyCard
            key={property.title}
            {...property}
            onPress={() => handleViewProperty(property.id)}
          />
        ))}
      </div>
    </div>
  );
}
