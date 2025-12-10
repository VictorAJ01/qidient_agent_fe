import { Card, Button, Progress, Divider, Textarea } from "@heroui/react";
import { Avatar } from "@heroui/react";
import { IoMdAttach } from "react-icons/io";
import { TbCircleDashed } from "react-icons/tb";

import { activities, information, person, shedules } from "./types/leads.types";

export default function LeadsInquiriesPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 w-full py-5">
          <Card className="w-full sm:flex-[1] flex items-center py-7">
            <div className="relative inline-block">
              <Avatar
                className="w-30 h-30"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />

              <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-blue-500 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="py-3 text-center space-y-4">
              <div className="space-y-2">
                <p className="text-black">{person.firstName}</p>
                <p className="text-black font-semibold text-xl">
                  {person.lastName}
                </p>
              </div>
              <p className="text-primary font-semibold text-lg">
                {person.Number}
              </p>
              <span className="text-gray-500">{person.email}</span>
            </div>
          </Card>

          <Card className="w-full sm:flex-[1.5] relative">
            <div className="p-5 space-y-4">
              <p className="text-primary text-xl font-semibold font-rubik">
                General information
              </p>
              <div className="space-y-6  py-4">
                {information.map((info) => (
                  <div key={info.Id} className="flex justify-between">
                    <span className="text-sm text-black font-rubik">
                      {info.title}
                    </span>
                    <span className="text-gray-900 text-sm font-rubik">
                      {info.description}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-black mb-1">
                  <span>Lead Scoring</span>
                  <span>Warm</span>
                </div>

                <div className="w-full h-2 bg-gray-200  rounded-full overflow-hidden">
                  <Progress
                    aria-label="Loading..."
                    color="warning"
                    value={50}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="w-full sm:flex-[1.5] relative">
            <div className="mx-auto py-5 px-12 flex flex-col justify-center h-full w-full gap-4 sm:gap-6">
              {shedules.map(({ id, title, Icon }) => (
                <div key={id} className="w-full">
                  <Button
                    className="w-full"
                    color="success"
                    radius="sm"
                    size="lg"
                    startContent={<Icon className="w-5 h-5" />}
                    variant="flat"
                  >
                    {title}
                  </Button>
                  <Divider className="mt-4" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="py-6 w-full flex flex-col sm:flex-row gap-10">
          <Card className="w-full  sm:flex-[2.5] relative">
            <div className="w-full space-y-4">
              <div className="flex justify-between flex-wrap md:flex-nowrap gap-3 items-center p-5">
                <div className="flex gap-3 items-center">
                  <Avatar
                    className="w-14 h-14"
                    src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  />

                  <span className="font-medium text-gray-900 whitespace-nowrap">
                    Praise Madumere
                  </span>
                </div>

                {/* Divider only visible on large screens */}
                <Divider className="hidden lg:block w-2/6 bg-primary" />

                {/* Title should wrap on small devices */}
                <div className="w-full md:w-[316px]">
                  <p className="font-bold text-lg md:text-xl">
                    Inquiry on 3 Bedroom Terrace Guzepe Aparment{" "}
                    <span className="text-primary underline font-semibold">
                      {" "}
                      #12445
                    </span>
                  </p>
                </div>
              </div>

              <div className="px-5 space-y-4">
                <div className="w-full rounded-2xl bg-blue-100 mx-auto px-3 sm:px-6">
                  <span className="absolute left-0 right-0 -translate-y-3.5 w-fit rounded-3xl py-2 px-7 bg-primary text-white mx-auto text-sm">
                    25-09-2025
                  </span>

                  <p className="text-blue-500 text-center py-7 px-4 sm:px-8">
                    Hello, I want to know how the payment plan works for this
                    property. Also let me know if scheduling a viewing is
                    possible.
                  </p>
                </div>
              </div>

              <div className="p-5">
                <Textarea
                  classNames={{
                    inputWrapper: "border-primary/40",
                  }}
                  color="primary"
                  placeholder="Enter your message"
                  radius="md"
                  variant="bordered"
                />
              </div>

              <div className="flex justify-between items-center w-full mx-auto px-4 pb-5">
                <Button
                  isIconOnly
                  className="bg-blue-100"
                  radius="md"
                  size="lg"
                >
                  <IoMdAttach className="text-blue-800" size={25} />
                </Button>

                <Button
                  className="py-6 px-10"
                  color="primary"
                  radius="full"
                  size="lg"
                >
                  Reply
                </Button>
              </div>
            </div>
          </Card>

          <Card className="w-full sm:flex-[1.9] ">
            <div className="flex items-center pt-6 px-10 gap-3">
              <TbCircleDashed className="text-primary" size={25} />
              <h2 className="font-semibold text-black font-rubik text-lg">
                Recent Activity
              </h2>
            </div>

            <div className="space-y-4 py-6 px-10">
              {activities.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start justify-between px-4 py-2.5 rounded-xl ${item.bg}`}
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.subtitle}</p>
                  </div>

                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
