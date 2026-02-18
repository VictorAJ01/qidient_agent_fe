import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { amenitySchema, AmenityFormValues } from "../schema/amenity.schema";

import { createAmenityApi } from "@/pages/amenities/api/amenities.api";
import { queryKeys } from "@/utils/keys";
import { CustomModalProps } from "@/types";

export default function CreateAmenityModal({
  isOpen,
  onOpenChange,
  onClose,
}: CustomModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AmenityFormValues>({
    resolver: yupResolver(amenitySchema) as Resolver<AmenityFormValues>,
    defaultValues: {
      name: "",
      description: "",
      icon: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAmenityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.amenities] });
      addToast({
        title: "Success",
        description: "Amenity created successfully",
        color: "success",
      });
      reset();
      onClose();
    },
    onError: () =>
      addToast({
        title: "Error",
        description: "Failed to create amenity",
        color: "danger",
      }),
  });

  const onSubmit = (data: AmenityFormValues) => mutate(data);

  return (
    <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody className="pt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Create New Amenity</h3>
              <p className="text-sm text-gray-500">
                Add a new amenity that can be assigned to properties.
              </p>
            </div>

            <Input
              {...register("name")}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              label="Name"
              labelPlacement="outside"
              placeholder="e.g. Swimming Pool, Gym"
              radius="sm"
            />

            <Textarea
              {...register("description")}
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
              label="Description (optional)"
              labelPlacement="outside"
              minRows={3}
              placeholder="Brief description of the amenity"
              radius="sm"
            />

            <Input
              {...register("icon")}
              errorMessage={errors.icon?.message}
              isInvalid={!!errors.icon}
              label="Icon (optional)"
              labelPlacement="outside"
              placeholder="e.g. pool, gym or 🏊"
              radius="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              radius="sm"
              variant="light"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              isLoading={isPending}
              radius="sm"
              type="submit"
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
