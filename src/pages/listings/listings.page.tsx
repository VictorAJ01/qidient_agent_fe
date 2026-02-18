import { Select, SelectItem, Input, Button, Pagination } from "@heroui/react";
import { FiSearch, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import PropertyCard from "./components/property_card";
import { GetPropertiesQueryParams } from "./types/listings.type";
import { getPropertiesApi } from "./api/listings.api";
import { statusOptions, typeOptions } from "./utils/data";

import EmptyState from "@/components/general/empty_state";
import Loader from "@/components/general/loader";
import { sidebarRoutes } from "@/routes";
import { useUrlPagination } from "@/hooks/use_url_pagination";
import { queryKeys } from "@/utils/keys";
import { useDebounce } from "@/hooks/use_debounce";

function searchParamsToQueryParams(
  searchParams: URLSearchParams,
): GetPropertiesQueryParams {
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const q = searchParams.get("q") || undefined;
  const status = searchParams.get("status") || undefined;
  const type = searchParams.get("type") || undefined;
  const isRentalParam = searchParams.get("isRental");

  const isRental =
    isRentalParam === "true"
      ? true
      : isRentalParam === "false"
        ? false
        : undefined;

  return { page, limit, q, status, type, isRental };
}

function queryParamsToSearchParams(
  params: GetPropertiesQueryParams,
): URLSearchParams {
  const next = new URLSearchParams();

  if (params.page && params.page > 1) next.set("page", String(params.page));
  if (params.limit && params.limit !== 10) {
    next.set("limit", String(params.limit));
  }
  if (params.q) next.set("q", params.q);
  if (params.status) next.set("status", params.status);
  if (params.type) next.set("type", params.type);
  if (params.isRental === true) next.set("isRental", "true");
  if (params.isRental === false) next.set("isRental", "false");

  return next;
}

export default function ListingsPage() {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useUrlPagination();
  const queryParams = searchParamsToQueryParams(searchParams);

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("q") ?? "",
  );

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (debouncedSearch) {
        next.set("q", debouncedSearch);
      } else {
        next.delete("q");
      }
      next.delete("page");

      return next;
    });
  }, [debouncedSearch, setSearchParams]);

  const { data, isPending } = useQuery({
    queryKey: [
      queryKeys.listings,
      { ...queryParams, q: debouncedSearch || undefined },
    ],
    queryFn: () =>
      getPropertiesApi({ ...queryParams, q: debouncedSearch || undefined }),
  });

  const properties = (data && data?.properties) || [];
  const paginationMeta = data && data?.meta;

  const rowsPerPage = paginationMeta?.limit || 10;

  const totalPages =
    paginationMeta?.totalPages ??
    (Math.ceil((properties?.length || 0) / rowsPerPage) || 1);

  const updateFilters = (updates: Partial<GetPropertiesQueryParams>) => {
    const next = queryParamsToSearchParams({
      ...queryParams,
      ...updates,
      page: 1,
      q: debouncedSearch || undefined,
    });

    setSearchParams(next);
  };

  const setPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("page", String(page));

      return next;
    });
  };

  const handleViewListing = (propertyId: string) => {
    navigate(sidebarRoutes.viewListing.replace(":id", propertyId));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
          <Input
            className="w-full md:min-w-3xs xl:min-w-sm"
            endContent={<FiSearch className="text-gray-400 text-xl" />}
            placeholder="Search by title, description or tags"
            radius="full"
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <Select
            aria-label="Status"
            className="lg:min-w-28 xl:min-w-36"
            color="primary"
            placeholder="Status"
            radius="sm"
            selectedKeys={
              queryParams.status ? new Set([queryParams.status]) : new Set()
            }
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;

              updateFilters({ status: key || undefined });
            }}
          >
            {statusOptions.map((status) => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
          <Select
            aria-label="Property type"
            className="lg:min-w-28 xl:min-w-32"
            placeholder="Type"
            radius="sm"
            selectedKeys={
              queryParams.type ? new Set([queryParams.type]) : new Set()
            }
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;

              updateFilters({ type: key || undefined });
            }}
          >
            {typeOptions.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>
          <Select
            aria-label="Rent or sale"
            className="lg:min-w-24 xl:min-w-32"
            placeholder="Rent / Sale"
            radius="sm"
            selectedKeys={
              queryParams.isRental === true
                ? new Set(["true"])
                : queryParams.isRental === false
                  ? new Set(["false"])
                  : new Set()
            }
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;

              updateFilters({
                isRental:
                  key === "true" ? true : key === "false" ? false : undefined,
              });
            }}
          >
            <SelectItem key="true">Rent</SelectItem>
            <SelectItem key="false">Sale</SelectItem>
          </Select>
        </div>

        <Button
          className="py-5"
          color="primary"
          radius="sm"
          startContent={<IoAddOutline className="text-lg" />}
          onPress={() => navigate(sidebarRoutes.createListing)}
        >
          Add new listing
        </Button>
      </div>

      {isPending ? (
        <div className="min-h-[280px] flex items-center justify-center">
          <Loader message="Loading listings..." />
        </div>
      ) : properties.length === 0 ? (
        <div className="min-h-[280px] flex items-center justify-center">
          <EmptyState
            icon={FiHome}
            message="No listings found. Try adjusting your filters or search."
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onPress={() => handleViewListing(property.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center py-6">
              <Pagination
                showControls
                classNames={{ wrapper: "gap-2" }}
                page={queryParams.page || 1}
                radius="sm"
                siblings={2}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
