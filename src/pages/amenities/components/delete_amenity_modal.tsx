import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

import { deleteAmenityApi } from "@/pages/amenities/api/amenities.api";
import { queryKeys } from "@/utils/keys";
import { CustomModalProps } from "@/types";

type DeleteAmenityModalProps = {
  amenityId: string | null;
  amenityName?: string;
} & CustomModalProps;

export default function DeleteAmenityModal({
  isOpen,
  onClose,
  amenityId,
  amenityName = "this amenity",
}: DeleteAmenityModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAmenityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.amenities] });
      addToast({
        title: "Success",
        description: "Amenity deleted successfully",
        color: "success",
      });
      onClose();
    },
    onError: () =>
      addToast({
        title: "Error",
        description: "Failed to delete amenity",
        color: "danger",
      }),
  });

  const handleDelete = () => {
    if (amenityId) mutate({ id: amenityId });
  };

  return (
    <Modal isOpen={isOpen} placement="center" size="sm" onClose={onClose}>
      <ModalContent>
        <ModalBody className="flex flex-col items-center justify-center pt-14 pb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full">
            <FaTrash className="text-red-500" />
          </div>
          <p className="text-center 2xl:text-lg px-6">
            Are you sure you want to delete{" "}
            <span className="text-red-500 font-medium">{amenityName}</span>?
          </p>
        </ModalBody>
        <ModalFooter className="w-full">
          <Button fullWidth radius="sm" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            fullWidth
            color="danger"
            isLoading={isPending}
            radius="sm"
            variant="flat"
            onPress={handleDelete}
          >
            {isPending ? "Deleting..." : "Yes, delete"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
