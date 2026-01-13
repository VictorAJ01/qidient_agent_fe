import { Button, Input } from "@heroui/react";
import { MdEmail } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

import { useGetUser } from "../hooks/use_get_admin";

export default function GeneralInformation() {
  const { user } = useGetUser();

  let relativeTime = "";
  const dateStr = user?.updatedAt;

  if (dateStr) {
    const dateObj = new Date(dateStr);

    if (!isNaN(dateObj.getTime())) {
      relativeTime = formatDistanceToNow(dateObj, { addSuffix: true });
    }
  }

  return (
    <div className="space-y-8">
      <form className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-4">
        <Input
          isDisabled
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
          classNames={{
            inputWrapper: "h-12",
            label: "text-sm font-medium text-gray-400 pb-1",
          }}
          id="first-name"
          label="First Name"
          labelPlacement="outside"
          placeholder="Enter your first name"
          radius="sm"
          type="text"
          value={user?.firstName || ""}
        />

        <Input
          isDisabled
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
          classNames={{
            inputWrapper: "h-12",
            label: "text-sm font-medium text-gray-400 pb-1",
          }}
          id="last-name"
          label="Last Name"
          labelPlacement="outside"
          placeholder="Enter your last name"
          radius="sm"
          type="text"
          value={user?.lastName || ""}
        />

        <Input
          isDisabled
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
          classNames={{
            inputWrapper: "h-12",
            label: "text-sm font-medium text-gray-400 pb-1",
          }}
          id="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          radius="sm"
          type="text"
          value={user?.email || ""}
        />

        <Input
          isDisabled
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
          classNames={{
            inputWrapper: "h-12",
            label: "text-sm font-medium text-gray-400 pb-1",
          }}
          id="phone"
          label="Phone"
          labelPlacement="outside"
          placeholder="Enter your phone number"
          radius="sm"
          type="text"
          value={user?.phone || ""}
        />
      </form>

      <div className="space-y-4">
        <h3 className="text-base font-medium">My email Address</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-light-primary-bg rounded-full flex items-center justify-center">
            <MdEmail className="text-xl text-primary" />
          </div>
          <div className="space-y-0.5 text-sm">
            <p>{user?.email || ""}</p>
            <p className="font-light text-gray-500">{relativeTime}</p>
          </div>
        </div>

        <Button color="primary" radius="sm">
          Add Email Address
        </Button>
      </div>
    </div>
  );
}
