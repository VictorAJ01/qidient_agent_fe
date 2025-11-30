import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { CustomModalProps } from "@/types";

const LogoutModal: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <Modal isOpen={isOpen} placement="center" size="md" onClose={onClose}>
      <ModalContent>
        <ModalBody className="flex flex-col items-center justify-center pt-20 pb-10">
          <p className="text-center max-w-52 text-lg">
            Are you sure you want to{" "}
            <span className="text-primary font-semibold">logout?</span>
          </p>
        </ModalBody>
        <ModalFooter className="w-full">
          <Button fullWidth className="py-6 bg-primary/10" onPress={onClose}>
            Close
          </Button>
          <Button
            fullWidth
            className="py-6"
            color="primary"
            onPress={handleLogout}
          >
            Yes, Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
