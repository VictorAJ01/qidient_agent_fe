import { MdEmail } from "react-icons/md";

export default function RecentDeviceLogin() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-light-primary-bg rounded-full flex items-center justify-center">
        <MdEmail className="text-xl text-primary" />
      </div>
      <div className="space-y-1 text-sm">
        <p>10.222.202.13</p>
        <p className="font-light text-gray-500">Redmi Note 10 Pro</p>
      </div>
    </div>
  );
}
