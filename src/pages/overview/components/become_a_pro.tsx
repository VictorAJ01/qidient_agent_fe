import { Button } from "@heroui/button";
import { FaRegFolderOpen } from "react-icons/fa6";

export default function BecomeAPro() {
  return (
    <div className="w-full rounded-md bg-primary p-6 flex items-start gap-6">
      <FaRegFolderOpen className="text-white text-4xl" />

      <div className="space-y-3 text-white">
        <h4 className="text-lg font-normal lg:max-w-40">
          Become a Pro to get more Space
        </h4>
        <Button className="px-6 text-white bg-dark-blue" radius="full">
          Upgrade Plans
        </Button>
      </div>
    </div>
  );
}
