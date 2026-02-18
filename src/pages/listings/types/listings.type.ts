import { PaginationMeta } from "@/types";

export type GetListingsCountResponsePayload = {
  totalListings: number;
  activeListings: number;
  soldListings: number;
  rentedListings: number;
};

export type PropertyImage = {
  _id: string;
  id: string;
  url: string;
};

export type PropertyLocation = {
  type: "Point";
  coordinates: [number, number];
};

export type PropertyListedBy = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  id: string;
};

export type Property = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  location: PropertyLocation;
  type: string;
  bedrooms: number;
  bathrooms: number;
  images: PropertyImage[];
  amenities: string[];
  listedBy: PropertyListedBy;
  status: string;
  isRental: boolean;
  category: string;
  size: number;
  yearBuilt?: number;
  address: string;
  state: string;
  city: string;
  country: string;
  features: string[];
  tags: string[];
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  url: string;
  formattedPrice: string;
  age?: number;
};

export type GetPropertiesResponse = {
  properties: Property[];
  meta: PaginationMeta;
};

export type GetPropertiesQueryParams = {
  q?: string;
  type?: string;
  category?: string;
  status?: string;
  isRental?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minSize?: number;
  maxSize?: number;
  minYearBuilt?: number;
  maxYearBuilt?: number;
  location?: string;
  listedBy?: string;
  amenities?: string[];
  tags?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export type GetPropertyQueryParams = {
  id: string;
};

export type GetPropertyResponsePayload = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  location: PropertyLocation;
  type: string;
  bedrooms: number;
  bathrooms: number;
  images: PropertyImage[];
  amenities: string[];
  status: string;
  isRental: boolean;
  category: string;
  size: number;
  yearBuilt?: number;
  address: string;
  state: string;
  city: string;
  country: string;
  listedBy: PropertyListedBy;
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  features: string[];
  tags: string[];
  __v: number;
  url: string;
  formattedPrice: string;
  age: number;
  id: number;
};

export type CreatePropertyPayload = {
  title: string;
  slug?: string; // URL-friendly property slug (auto-generated if not provided)
  description: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  images?: File[];
  amenities?: string[];
  status: string;
  isRental: boolean;
  category: string;
  size?: number;
  yearBuilt?: number;
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  features?: string[];
  tags?: string[];
};
