import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { IoArrowBackOutline } from "react-icons/io5";

export type BackButtonProps = {
  route: string;
};

export const BackButton = (props: BackButtonProps) => {
  const navigate = useNavigate();

  const handleRouteBack = (): void => {
    navigate(props.route);
  };

  return (
    <Button isIconOnly className="bg-[#F9F5FF26]" onPress={handleRouteBack}>
      <IoArrowBackOutline className="text-lg text-white" />
    </Button>
  );
};
