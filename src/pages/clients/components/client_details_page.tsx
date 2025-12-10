import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@heroui/react";
import { useParams } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoUnlock } from "react-icons/go";
import { LuFileUp } from "react-icons/lu";
import { BiSolidFolderOpen } from "react-icons/bi";

import RecentActivityCard from "./recent_activity_card";

import UserDetailsCard from "@/components/general/user_details_card";

export default function ClientDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        <div className="px-4 lg:px-7 py-4 lg:py-6 bg-white rounded-lg space-y-4">
          <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-7 w-full">
            <div>
              <Avatar alt="John Doe" className="w-24 h-24" src="" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 lg:gap-6">
              <UserDetailsCard title="ID:" value={id?.toUpperCase()} />
              <UserDetailsCard title="Name:" value="John Doe" />
              <UserDetailsCard title="Number:" value="(234) 123-7667" />
              <UserDetailsCard title="Email:" value="parish.yet@gmail.com" />
              <UserDetailsCard title="Address:" value="123 House Street" />
              <UserDetailsCard title="Joined:" value="2025-08-04" />
              <UserDetailsCard title="Account Status" value="Active" />
              <UserDetailsCard title="Verification Status" value="Verified" />
              <UserDetailsCard title="Client Type" value="Buyer" />
              <UserDetailsCard title="Agency" value="Prime Properties" />
              <UserDetailsCard title="Account Type" value="Professional" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
            <div className="space-y-2">
              <div className="bg-white rounded-xl h-32 w-full flex flex-col items-center justify-center gap-1">
                <LuFileUp className="text-3xl text-primary" />
                <p className="text-sm text-gray-500">Click to upload</p>
              </div>

              {new Array(2).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="w-full rounded-lg bg-primary px-4 py-5 flex items-center justify-between"
                >
                  <div className="space-y-1 text-white">
                    <p className="text-sm font-bold">phoenix-document.pdf</p>
                    <div className="flex gap-5 font-medium text-sm">
                      <p className="cursor-pointer">View</p>
                      <p className="cursor-pointer">Download</p>
                      <p className="cursor-pointer text-danger-50">Delete</p>
                    </div>
                  </div>

                  <BiSolidFolderOpen className="text-blue-100 text-4xl" />
                </div>
              ))}
            </div>
            <Card className="p-2 rounded-lg border-none" shadow="none">
              <CardBody className="space-y-3">
                <Button
                  className="w-full"
                  color="success"
                  radius="sm"
                  startContent={<MdOutlineRemoveRedEye />}
                  variant="flat"
                >
                  Send message
                </Button>
                <Divider />
                <Button
                  className="w-full"
                  color="success"
                  radius="sm"
                  startContent={<GoUnlock />}
                  variant="flat"
                >
                  Link Property
                </Button>
                <Divider />
                <Button
                  className="w-full"
                  color="success"
                  radius="sm"
                  startContent={<MdOutlineRemoveRedEye />}
                  variant="flat"
                >
                  Schedule Viewing
                </Button>
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-1 xl:col-span-2 space-y-6">
            <Card className="p-2 rounded-lg border-none" shadow="sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <FaCircleNotch className="text-lg text-blue-400" />
                  <h3 className="text-xl font-medium">Recent Activity</h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-4">
                  <RecentActivityCard
                    bgColor="bg-blue-50"
                    subTitle="Luxury Apartment in Ikoyi"
                    title="You messaged Jane Doe about ‘Lekki Duplex’"
                    updatedAt="2 hours ago"
                  />
                  <RecentActivityCard
                    bgColor="bg-green-50"
                    subTitle="Property Sold"
                    title="Terrace Duplex in Lekki"
                    updatedAt="1 day ago"
                  />
                  <RecentActivityCard
                    bgColor="bg-amber-50"
                    subTitle="Price update"
                    title="Terrace Duplex in Lekki"
                    updatedAt="2 days ago"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
