import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBookingApi } from "../api/bookings.api";
import { CreateBookingPayload } from "../types/bookings.type";

interface CreateBookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  leadId?: string;
  clientId?: string;
  propertyId?: string;
  agentId?: string;
}

export default function CreateBookingModal({
  isOpen,
  onOpenChange,
  leadId,
  clientId,
  propertyId,
  agentId,
}: CreateBookingModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<CreateBookingPayload>>({
    viewingType: "in_person",
    startTime: "",
    endTime: "",
    notes: "",
  });

  const createBookingMutation = useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBookingApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      onOpenChange(false);
    },
  });

  const handleSubmit = () => {
    if (!propertyId || !agentId || !clientId) return;

    createBookingMutation.mutate({
      property: propertyId,
      agent: agentId,
      client: clientId,
      lead: leadId,
      ...formData,
    } as CreateBookingPayload);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Schedule Viewing
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Select
              label="Viewing Type"
              selectedKeys={[formData.viewingType || ""]}
              onSelectionChange={(keys) =>
                setFormData({
                  ...formData,
                  viewingType: Array.from(keys)[0] as any,
                })
              }
            >
              <SelectItem key="in_person">In Person</SelectItem>
              <SelectItem key="virtual">Virtual</SelectItem>
            </Select>

            <Input
              label="Start Time"
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />

            <Input
              label="End Time"
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />

            <Textarea
              label="Notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            isLoading={createBookingMutation.isPending}
            onPress={handleSubmit}
          >
            Create Booking
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
