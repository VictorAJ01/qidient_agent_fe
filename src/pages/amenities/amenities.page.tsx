import type { Amenity } from "@/pages/amenities/types/amenities.type";

import {
  Input,
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
} from "@heroui/react";
import { TbTools } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import CreateAmenityModal from "./components/create_amenity_modal";
import EditAmenityModal from "./components/edit_amenity_modal";
import DeleteAmenityModal from "./components/delete_amenity_modal";

import { getAmenitiesApi } from "@/pages/amenities/api/amenities.api";
import { queryKeys } from "@/utils/keys";
import EmptyState from "@/components/general/empty_state";
import Loader from "@/components/general/loader";
import { useDebounce } from "@/hooks/use_debounce";

const limit = 10;

export default function AmenitiesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const createModal = useDisclosure();
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const debouncedSearch = useDebounce(search, 500);

  const { isPending, data } = useQuery({
    queryKey: [queryKeys.amenities, page, limit],
    queryFn: () => getAmenitiesApi({ page, limit }),
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const amenities = data?.amenities ?? [];
  const paginationMeta = data?.meta;
  const totalPages = paginationMeta?.totalPages ?? 1;

  const handleEdit = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    editModal.onOpen();
  };

  const handleDelete = (amenity: Amenity) => {
    setDeleteTarget({ id: amenity._id, name: amenity.name });
    deleteModal.onOpen();
  };

  const handleCloseEdit = () => {
    setSelectedAmenity(null);
    editModal.onClose();
  };

  const handleCloseDelete = () => {
    setDeleteTarget(null);
    deleteModal.onClose();
  };

  const filteredAmenities = debouncedSearch
    ? amenities.filter(
        (a) =>
          a.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          a.description?.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    : amenities;

  return (
    <div className="w-full py-3 bg-white rounded-xl md:rounded-xl overflow-auto">
      <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-0 items-center justify-between px-5 pt-3 pb-4">
        <p className="text-base font-semibold">All Amenities</p>
        <Input
          isClearable
          className="md:max-w-sm xl:max-w-lg"
          placeholder="Search by name or description"
          radius="full"
          startContent={<FiSearch className="text-gray-400 text-xl" />}
          value={search}
          onClear={() => setSearch("")}
          onValueChange={setSearch}
        />
        <Button
          color="primary"
          radius="sm"
          startContent={<TbTools className="text-lg" />}
          onPress={createModal.onOpen}
        >
          Add Amenity
        </Button>
      </div>

      <Table
        removeWrapper
        aria-label="Amenities table"
        bottomContent={
          amenities.length > 0 && (
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
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          )
        }
        classNames={{
          th: "bg-gray-100 font-medium text-xs px-4 py-3 rounded-none table-header",
          td: "px-4 text-xs",
          tr: "text-grey-02",
        }}
        radius="sm"
      >
        <TableHeader>
          <TableColumn>
            <div className="flex gap-2 items-center">
              <TbTools className="text-xl" />
              <p>Name</p>
            </div>
          </TableColumn>
          <TableColumn>Icon</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn align="end">Actions</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="h-64 lg:h-72 flex items-center justify-center">
              <EmptyState
                icon={TbTools}
                message="No amenities found. Add your first amenity to get started."
              />
            </div>
          }
          loadingContent={<Loader message="Fetching amenities..." />}
          loadingState={isPending ? "loading" : "idle"}
        >
          {filteredAmenities.map((amenity) => (
            <TableRow
              key={amenity._id}
              className="border-b-1 border-grey-10 h-16"
            >
              <TableCell>
                <span className="text-sm font-medium text-black">
                  {amenity.name}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-lg" title={amenity.icon ?? undefined}>
                  {amenity.icon ?? "—"}
                </span>
              </TableCell>
              <TableCell className="max-w-xs">
                <span className="text-grey-02 line-clamp-2">
                  {amenity.description ?? "—"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <Button
                    radius="sm"
                    size="sm"
                    variant="flat"
                    onPress={() => handleEdit(amenity)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    radius="sm"
                    size="sm"
                    variant="flat"
                    onPress={() => handleDelete(amenity)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CreateAmenityModal
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        onOpenChange={createModal.onOpenChange}
      />
      <EditAmenityModal
        amenity={selectedAmenity}
        isOpen={editModal.isOpen}
        onClose={handleCloseEdit}
        onOpenChange={editModal.onOpenChange}
      />
      <DeleteAmenityModal
        amenityId={deleteTarget?.id ?? null}
        amenityName={deleteTarget?.name}
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDelete}
        onOpenChange={deleteModal.onOpenChange}
      />
    </div>
  );
}
