import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@heroui/react";
import { CiWarning } from "react-icons/ci";

type SessionExpirationModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  errorMessage: Error | string;
  onPress: () => void;
};

export default function SessionExpiredModal({
  isOpen,
  onPress,
  errorMessage,
  onOpenChange,
}: SessionExpirationModalProps) {
  return (
    <Modal
      hideCloseButton
      isKeyboardDismissDisabled
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      placement="center"
      size="md"
      onClose={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex justify-center">
          Session Timeout
        </ModalHeader>
        <ModalBody className="flex flex-col items-center justify-center">
          <div className="space-y-2">
            <div className="text-4xl mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <CiWarning />
            </div>
            <p className="text-center max-w-80">{String(errorMessage)}</p>
          </div>
        </ModalBody>
        <ModalFooter className="w-full">
          <Button fullWidth className="py-6" color="primary" onPress={onPress}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
