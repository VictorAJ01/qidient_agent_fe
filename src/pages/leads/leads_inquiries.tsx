import { Card, Button, Progress, Divider} from "@heroui/react";
import { Avatar } from "@heroui/react";
import { IoEyeOutline } from "react-icons/io5";
import { PiLockKeyOpenLight } from "react-icons/pi";
import { IoMdAttach } from "react-icons/io";

export default function LeadsInquiriesPage() {
  const person = {
    firstName: "Praise ",
    lastName: "Madumere",
    Number: "(234) 812-34567",
    email: "parish.yet@gmail.com",
  };

  const shedules = [
    { id: 1, title: "Assign Lead", Icon: IoEyeOutline },
    { id: 2, title: "Schedule Viewing", Icon: IoEyeOutline },
    { id: 3, title: "Archive Lead", Icon: PiLockKeyOpenLight },
    { id: 4, title: "Archive Lead", Icon: PiLockKeyOpenLight },
  ];

  const information = [
    { Id: 1, title: "Client type:", description: "Buyer" },
    { id: 2, title: "ID:", description: "17r3830" },
    { id: 3, title: "Address:", description: "123 House Street" },
    { id: 4, title: "Date of inquiry:", description: "27-05-2025" },
    { id: 5, title: "Source:", description: "Website" },
  ];

  const activities = [
    {
      id: 1,
      title: "Praiz Chuks Replied",
      subtitle: "Luxury Apartment in Ikoyi",
      time: "2 hours ago",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      title: "Lead Archived",
      subtitle: "Terrace Duplex in Lekki",
      time: "1 day ago",
      bg: "bg-green-50",
    },
    {
      id: 3,
      title: "Viewing Schedule set",
      subtitle: "Terrace Duplex in Lekki",
      time: "2 days ago",
      bg: "bg-yellow-50",
    },
    {
      id: 4,
      title: "Viewing Schedule set",
      subtitle: "Terrace Duplex in Lekki",
      time: "2 days ago",
      bg: "bg-red-50",
    },
  ];
  
  return (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-full mx-auto">
        <div className="py-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-6 w-full py-5">
            <Card className="w-full h-[300px] sm:flex-[1] flex items-center py-7">
              <div className="relative inline-block">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  className="w-30 h-30"
                />

                <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-blue-500 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="py-3 text-center">
                <div className="py-5">
                  <p className="">{person.firstName}</p>
                  <p className="font-semibold text-3xl">{person.lastName}</p>
                </div>
                <p className="text-blue-800 py-4">{person.Number}</p>
                <span className="text-gray-400">{person.email}</span>
              </div>
            </Card>

            <Card className="w-full h-[300px] sm:flex-[1.5] relative">
              <div className="p-5">
                <p className="text-blue-800">General information</p>
                <div className="space-y-6 text-sm py-4">
                  {information.map((info) => (
                    <div key={info.Id} className="flex justify-between">
                      <span className="text-gray-900">{info.title}</span>
                      <span className="font-medium text-gray-900">
                        {info.description}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
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

            <Card className="w-full h-auto sm:h-[300px] sm:flex-[1.5] relative">
              <div className="mx-auto p-5 flex flex-col justify-center h-full gap-4 sm:gap-6">
                {shedules.map(({ id, title, Icon }) => (
                  <div key={id} className="flex w-full">
                    <Button className="w-full bg-green-200 py-7   sm:px-6 flex md:px-15 lg:px-30 items-center justify-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm sm:text-base">{title}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className=" w-full flex flex-col sm:flex-row gap-10">

            <Card className="w-full h-[400px] min-h-[400px] sm:flex-[2.5] relative">
              <div>
                <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center p-5">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                    className="w-14 h-14"
                  />

                  <span className="font-medium text-gray-900 whitespace-nowrap">
                    Praise Madumere
                  </span>

                  <Divider className="hidden sm:block w-40 bg-blue-500" />

                  <p className="font-bold text-lg sm:text-xl flex-1">
                    Inquiry on 3 Bedroom Terrace Guzepe Aparment
                    <span className="text-blue-500 underline"> #12445</span>
                  </p>
                </div>

                <div className="">
                  <div className="max-w-[450px] w-full rounded-2xl bg-blue-100 mx-auto">
                    <span className="block w-fit rounded-3xl py-2 px-7 bg-blue-500 text-white mx-auto text-sm">
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
                  <div className="max-w-[450px] h-30 w-full rounded-2xl border border-blue-300 mx-auto">
                    <p className="text-blue-500 text-center py-7 px-4 sm:px-8">
                    </p>
                  </div>
                </div>
                <div className="flex  justify-between max-w-[450px] w-full mx-auto px-4 sm:px-0">
                  <div className="bg-blue-100 w-14 h-14 flex items-center justify-center rounded-lg">
                    <IoMdAttach size={25} className="text-blue-800" />
                  </div>

                  <Button
                    className="py-6 px-10"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="w-full h-[400px] sm:flex-[2] ">
              <div className="flex items-center pt-6 px-10 gap-3">
                <div className="w-6 h-6  rounded-full border-2 border-blue-500 animate-spin-slow"></div>
                <h2 className="font-semibold text-gray-900 text-lg ">
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-6  py-6 px-10">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start justify-between p-4 rounded-xl ${item.bg}`}
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item.title}
                      </h3>
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
    </div>
  );
}
