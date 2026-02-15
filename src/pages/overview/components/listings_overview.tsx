import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

import { sidebarRoutes } from "@/routes";
import UserStatusBadge from "@/components/general/user_status";
import { Property } from "@/pages/listings/types/listings.type";

type ListingsOverviewProps = {
  listings: Property[];
};

export default function ListingsOverview({ listings }: ListingsOverviewProps) {
  const truncatedListings = listings.slice(0, 3);

  return (
    <div className="w-full py-4 bg-white rounded-xl overflow-auto">
      <div className="flex items-center justify-between px-5 pt-3 pb-4">
        <h1 className="text-lg font-medium text-black">Listings Overview</h1>

        <Link
          as={RouterLink}
          className="text-sm text-grey/82 underline"
          to={sidebarRoutes.listings}
        >
          View All Listings
        </Link>
      </div>

      <Table
        removeWrapper
        aria-label="Listings overview table"
        classNames={{
          th: "bg-gray-100 font-medium text-xs px-4 py-3 rounded-none table-header",
          td: "px-4 text-xs",
          tr: "text-grey-02",
        }}
        radius="sm"
      >
        <TableHeader>
          <TableColumn>Name/ID</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>

        <TableBody>
          {truncatedListings.map((listing, index) => {
            const lastIndex = truncatedListings.length - 1;

            return (
              <TableRow
                key={index}
                className={`${index !== lastIndex ? "border-b border-gray-300" : ""}`}
              >
                <TableCell>
                  <div className="text-xs">
                    <h3 className="text-sm text-black max-w-28 text-ellipsis text-nowrap overflow-hidden">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 text-ellipsis text-nowrap overflow-hidden max-w-28">
                      {listing.description}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  {listing.city}, {listing.country}
                </TableCell>

                <TableCell>
                  <UserStatusBadge status={listing.status} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
