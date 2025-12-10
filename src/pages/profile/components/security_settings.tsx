import { Input } from "@heroui/input";
import { Button, Switch } from "@heroui/react";

import RecentDeviceLogin from "./recent_device_login";

export default function SecuritySettings() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <form className="space-y-5">
          {/* Current password */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <Input
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
              id="current-password"
              placeholder="Enter current password"
              radius="sm"
              type="password"
            />
          </div>

          {/* New password */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="new-password"
            >
              New Password
            </label>
            <Input
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
              id="new-password"
              placeholder="Enter new password"
              radius="sm"
              type="password"
            />
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <Input
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
              id="confirm-password"
              placeholder="Confirm new password"
              radius="sm"
              type="password"
            />
          </div>
        </form>

        {/* List of devices */}
        <div className="space-y-4">
          <h3 className="text-base font-medium">List of recent logins</h3>
          <div className="space-y-5">
            <RecentDeviceLogin />
            <RecentDeviceLogin />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Switch defaultChecked size="sm" />
          <p className="text-xs font-light text-gray-500">
            2-FACTOR AUTHENTICATION
          </p>
        </div>
        <Button color="primary" radius="sm">
          Logout all devices
        </Button>
      </div>
    </div>
  );
}
