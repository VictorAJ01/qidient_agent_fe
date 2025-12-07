import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import UserStatusBadge from "@/components/general/user_status";
import { sidebarRoutes } from "@/routes";

const allClientsData = [
  {
    id: 1,
    fullname: "Emeka Paul",
    phone: "+234-32838393",
    clientType: "Rent",
    linkedProperty: 7,
    lastContactDate: "27-08-25",
    status: "Active",
  },
  {
    id: 2,
    fullname: "Jane Doe",
    phone: "+234-12345678",
    clientType: "Lease",
    linkedProperty: 3,
    lastContactDate: "15-09-25",
    status: "Inactive",
  },
  {
    id: 3,
    fullname: "John Smith",
    phone: "+234-87654321",
    clientType: "Sale",
    linkedProperty: 5,
    lastContactDate: "10-09-25",
    status: "Pending",
  },
  {
    id: 4,
    fullname: "Alice Johnson",
    phone: "+234-11223344",
    clientType: "Rent",
    linkedProperty: 2,
    lastContactDate: "05-09-25",
    status: "Active",
  },
  {
    id: 5,
    fullname: "Bob Brown",
    phone: "+234-55667788",
    clientType: "Lease",
    linkedProperty: 4,
    lastContactDate: "01-09-25",
    status: "Inactive",
  },
  {
    id: 6,
    fullname: "Clara White",
    phone: "+234-99887766",
    clientType: "Sale",
    linkedProperty: 6,
    lastContactDate: "20-08-25",
    status: "Pending",
  },
  {
    id: 7,
    fullname: "David Green",
    phone: "+234-44556677",
    clientType: "Rent",
    linkedProperty: 1,
    lastContactDate: "18-08-25",
    status: "Active",
  },
  {
    id: 8,
    fullname: "Ella Blue",
    phone: "+234-22334455",
    clientType: "Lease",
    linkedProperty: 8,
    lastContactDate: "12-08-25",
    status: "Inactive",
  },
  {
    id: 9,
    fullname: "Frank Black",
    phone: "+234-66778899",
    clientType: "Sale",
    linkedProperty: 9,
    lastContactDate: "08-08-25",
    status: "Pending",
  },
  {
    id: 10,
    fullname: "Grace Yellow",
    phone: "+234-33445566",
    clientType: "Rent",
    linkedProperty: 10,
    lastContactDate: "01-08-25",
    status: "Active",
  },
];

const statuses = ["Active", "Inactive", "Pending"];

export default function AllClientsTable() {
  const navigate = useNavigate();

  const handleViewClient = (id: string | number) =>
    navigate(`${sidebarRoutes.clients}/${id}`);

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
        <h4 className="text-base font-medium">All Clients (203)</h4>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
          <Input
            className="w-full md:min-w-3xs xl:min-w-xs"
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
          startContent={<AiOutlineUserAdd className="text-lg" />}
        >
          Add new client
        </Button>
      </div>

      <div className="p-4 bg-white rounded-xl">
        <Table
          removeWrapper
          aria-label="Clients table"
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

          <TableBody>
            {allClientsData.map((client, index) => {
              return (
                <TableRow key={index} className="border-b border-gray-300">
                  <TableCell>
                    <div className="text-xs">
                      <h3 className="text-sm text-black max-w-28 text-ellipsis text-nowrap overflow-hidden">
                        {client.fullname}
                      </h3>
                      <p>{client.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{client.clientType}</TableCell>
                  <TableCell>{client.linkedProperty}</TableCell>
                  <TableCell>{client.lastContactDate}</TableCell>
                  <TableCell>
                    <UserStatusBadge status={client.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      className="border-1"
                      size="sm"
                      variant="bordered"
                      onPress={() => handleViewClient(client.id)}
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
  );
}
