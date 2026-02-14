import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FiSearch, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "date-fns";

import { getClientsApi, getClientsStatsApi } from "./api/clients.api";
import { ClientStatus } from "./types/clients.type";

import StatsCard from "@/components/general/stats_card";
import { queryKeys } from "@/utils/keys";
import { sidebarRoutes } from "@/routes";
import UserStatusBadge from "@/components/general/user_status";
import { useUrlPagination } from "@/hooks/use_url_pagination";
import EmptyState from "@/components/general/empty_state";
import Loader from "@/components/general/loader";

const statuses: ClientStatus[] = ["active", "inactive"];

export default function ClientsPage() {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useUrlPagination();

  const status = (searchParams.get("status") as ClientStatus) || "active";

  const { data: clientsStats } = useQuery({
    queryKey: [queryKeys.clientsStats],
    queryFn: getClientsStatsApi,
  });

  const { totalClients, activeClients, inactiveClients } = clientsStats || {};

  const clientsStatCardData = [
    {
      title: "Total Clients",
      figure: totalClients || 0,
    },
    {
      title: "Active Clients",
      figure: activeClients || 0,
    },
    {
      title: "Inactive Clients",
      figure: inactiveClients || 0,
    },
  ];

  const { data: clientsData, isPending: isLoadingClients } = useQuery({
    queryKey: [queryKeys.clients, status],
    queryFn: () => getClientsApi({ status }),
  });

  const clients = clientsData?.clients || [];
  const paginationMeta = clientsData && clientsData?.meta;

  const rowsPerPage = paginationMeta?.limit || 10;

  const totalPages =
    paginationMeta?.totalPages || Math.ceil(clients.length / rowsPerPage);

  const handleViewClient = (id: string | number) =>
    navigate(`${sidebarRoutes.clients}/${id}`);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {clientsStatCardData.map((item, index) => (
          <StatsCard key={item.title} {...item} index={index} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
          <h4 className="text-base font-medium">
            All Clients{" "}
            {totalClients && totalClients > 0 ? `(${totalClients})` : ""}
          </h4>

          <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
            <Input
              className="w-full md:min-w-3xs xl:min-w-sm"
              endContent={<FiSearch className="text-gray-400 text-xl" />}
              placeholder="Search by name, ID or email"
              radius="full"
            />
            <Select
              className="lg:min-w-28"
              color="primary"
              defaultSelectedKeys={[status]}
              radius="sm"
              onSelectionChange={(e) =>
                setSearchParams({ status: e.currentKey as ClientStatus })
              }
            >
              {statuses.map((status) => (
                <SelectItem key={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </Select>
            <Select
              className="lg:min-w-28"
              defaultSelectedKeys={["rent"]}
              radius="sm"
            >
              {["Rent", "Lease", "Sale"].map((type) => (
                <SelectItem key={type.toLowerCase()}>{type}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl">
          <Table
            removeWrapper
            aria-label="Clients table"
            bottomContent={
              clients.length > 0 && (
                <div className="pb-4 flex justify-center">
                  <Pagination
                    showControls
                    classNames={{
                      wrapper: ["space-x-2"],
                    }}
                    initialPage={1}
                    page={paginationMeta?.page}
                    radius="sm"
                    siblings={3}
                    total={totalPages}
                    onChange={(newPage) => {
                      setSearchParams({ page: newPage.toString() });
                    }}
                  />
                </div>
              )
            }
            classNames={{
              th: "bg-gray-100 capitalize font-medium text-xs px-4 py-3 rounded-none table-header",
              td: "px-4 text-xs",
              tr: "text-grey-02",
            }}
            radius="sm"
          >
            <TableHeader>
              <TableColumn>Name/contact info</TableColumn>
              <TableColumn>client type</TableColumn>
              <TableColumn>linked property</TableColumn>
              <TableColumn>last contact date</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <div className="h-64 lg:h-72 flex items-center justify-center">
                  <EmptyState icon={FiUsers} message="No client found" />
                </div>
              }
              loadingContent={<Loader message="Fetching clients..." />}
              loadingState={isLoadingClients ? "loading" : "idle"}
            >
              {clients.map((client, index) => {
                return (
                  <TableRow key={index} className="border-b border-gray-300">
                    <TableCell>
                      <div className="text-xs">
                        <h3 className="text-sm text-black max-w-28 text-ellipsis text-nowrap overflow-hidden">
                          {client.user}
                        </h3>
                        <p>+234-44556677</p>
                      </div>
                    </TableCell>
                    <TableCell>{client.clientType}</TableCell>
                    <TableCell>{client.properties.length}</TableCell>
                    <TableCell>
                      {formatDate(client.updatedAt, "dd-MM-yyyy")}
                    </TableCell>
                    <TableCell>
                      <UserStatusBadge status={client.status} />
                    </TableCell>
                    <TableCell>
                      <Button
                        className="border-1"
                        size="sm"
                        variant="bordered"
                        onPress={() => handleViewClient(client._id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
