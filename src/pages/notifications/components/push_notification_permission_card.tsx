import { Button } from "@heroui/react";

export default function PushNotificationPermissionCard() {
  return (
    <div className="bg-primary/23 rounded-xl px-6 py-4 flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
      <p className="font-medium text-sm text-center lg:text-left">
        🔔 Turn on push notifications to know when important activities are
        carried out.
      </p>

      <div className="flex items-center gap-4">
        <Button
          className="text-sm font-bold border-1 border-[#6C668540]"
          radius="full"
          variant="bordered"
        >
          Allow push notifications
        </Button>
        <Button className="text-sm font-bold" radius="full" variant="light">
          Dismiss
        </Button>
      </div>
    </div>
  );
}
