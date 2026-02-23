import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  addToast,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { deletePropertyApi } from "../api/listings.api";

import { sidebarRoutes } from "@/routes";
import { CustomModalProps } from "@/types";
import { queryKeys } from "@/utils/keys";

type DeletePropertyModalProps = {
  propertyId: string | null;
  propertyTitle?: string;
} & CustomModalProps;

export default function DeletePropertyModal({
  isOpen,
  onClose,
  onOpenChange,
  propertyId,
  propertyTitle,
}: DeletePropertyModalProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: deletePropertyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.listings] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.listing] });
      addToast({
        title: "Success",
        description: "Property deleted successfully",
        color: "success",
      });
      onClose();
      navigate(sidebarRoutes.listings);
    },
    onError: () =>
      addToast({
        title: "Error",
        description: "Failed to delete property",
        color: "danger",
      }),
  });

  const handleDelete = () => {
    if (propertyId) mutate({ id: propertyId });
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      size="sm"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody className="flex flex-col items-center justify-center pt-14 pb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full">
            <FaTrash className="text-red-500" />
          </div>
          <p className="text-center 2xl:text-lg px-6">
            Are you sure you want to delete{" "}
            <span className="text-red-500 font-medium">{propertyTitle}</span>?
            <br />
            This action cannot be undone.
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
