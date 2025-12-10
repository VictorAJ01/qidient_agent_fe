import { Button, Input } from "@heroui/react";
import { MdEmail } from "react-icons/md";

export default function GeneralInformation() {
  return (
    <div className="space-y-8">
      <form className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-4">
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="first-name"
          >
            Full Name
          </label>
          <Input
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            id="first-name"
            placeholder="Your First Name"
            radius="sm"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="nick-name"
          >
            Nick Name
          </label>
          <Input
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            id="nick-name"
            placeholder="Your Nick Name"
            radius="sm"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="gender"
          >
            Gender
          </label>
          <Input
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            id="gender"
            placeholder="Your Gender"
            radius="sm"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="country"
          >
            Country
          </label>
          <Input
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            id="country"
            placeholder="Your Country"
            radius="sm"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="language"
          >
            Language
          </label>
          <Input
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            id="language"
            placeholder="Your Language"
            radius="sm"
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="time-zone"
          >
            Time Zone
          </label>
          <Input
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
            id="time-zone"
            placeholder="GMT +1"
            radius="sm"
            type="text"
          />
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-base font-medium">My email Address</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-light-primary-bg rounded-full flex items-center justify-center">
            <MdEmail className="text-xl text-primary" />
          </div>
          <div className="space-y-0.5 text-sm">
            <p>alexarawles@gmail.com</p>
            <p className="font-light text-gray-500">1 month ago</p>
          </div>
        </div>

        <Button color="primary" radius="sm">
          Add Email Address
        </Button>
      </div>
    </div>
  );
}
