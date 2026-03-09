import {
  Card,
  Button,
  Progress,
  Divider,
  Textarea,
  Avatar,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { useParams } from "react-router-dom";
import { IoMdAttach } from "react-icons/io";
import { TbCircleDashed } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";

import CreateBookingModal from "../bookings/components/create_booking_modal";

import { useLeadDetails } from "./hooks/use_lead_details";

export default function LeadsInquiriesPage() {
  const { id } = useParams<{ id: string }>();
  const { lead, client, property, isLoading } = useLeadDetails(id || "");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner label="Loading details..." />
      </div>
    );
  }

  if (!lead) {
    return <div className="p-10 text-center">Lead not found.</div>;
  }

  const information = [
    { id: 1, title: "Property", description: property?.title || "Unknown" },
    {
      id: 2,
      title: "Location",
      description: property?.address || "Unknown",
    },
    { id: 3, title: "Lead Source", description: lead.source },
    { id: 4, title: "Priority", description: lead.priority },
    {
      id: 5,
      title: "Created At",
      description: format(new Date(lead.createdAt), "PPP"),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 w-full py-5">
          <Card className="w-full lg:flex-[1] flex items-center py-7">
            <div className="relative inline-block">
              <Avatar
                className="w-32 h-32"
                src={"https://i.pravatar.cc/150?u=a04258a2462d826712d"}
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
                <p className="text-black font-semibold text-xl">
                  {client?.agent}
                </p>
              </div>
              <p className="text-primary font-semibold text-lg">0909090909</p>
              <span className="text-gray-500">[EMAIL_ADDRESS]</span>
            </div>
          </Card>

          <Card className="w-full lg:flex-[1.5] relative">
            <div className="p-5 space-y-4">
              <p className="text-primary text-xl font-semibold font-rubik">
                General information
              </p>
              <div className="space-y-6 py-4">
                {information.map((info) => (
                  <div key={info.id} className="flex justify-between">
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
                  <span>
                    {lead.priority === "high" || lead.priority === "urgent"
                      ? "Hot"
                      : "Warm"}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <Progress
                    aria-label="Lead Scoring"
                    color={
                      lead.priority === "urgent"
                        ? "danger"
                        : lead.priority === "high"
                          ? "warning"
                          : "primary"
                    }
                    value={
                      lead.priority === "urgent"
                        ? 90
                        : lead.priority === "high"
                          ? 70
                          : 40
                    }
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="w-full lg:flex-[1.5] relative">
            <div className="mx-auto py-5 px-6 lg:px-12 flex flex-col justify-center h-full w-full gap-4 sm:gap-6">
              <Button
                className="w-full"
                color="success"
                radius="sm"
                size="lg"
                startContent={<SlCalender className="w-5 h-5" />}
                variant="flat"
                onPress={onOpen}
              >
                Schedule Viewing
              </Button>
              <Divider />
              <Button
                className="w-full"
                color="primary"
                radius="sm"
                size="lg"
                variant="flat"
              >
                Mark as Contacted
              </Button>
            </div>
          </Card>
        </div>

        <div className="py-6 w-full flex flex-col lg:flex-row gap-10">
          <Card className="w-full lg:flex-[2.5] relative">
            <div className="w-full space-y-4">
              <div className="flex justify-between flex-wrap md:flex-nowrap gap-3 items-center p-5">
                <div className="flex gap-3 items-center">
                  <Avatar
                    className="w-14 h-14"
                    src={"https://i.pravatar.cc/150?u=a04258a2462d826712d"}
                  />
                  <span className="font-medium text-gray-900 whitespace-nowrap">
                    {client?.agent}
                  </span>
                </div>

                <Divider className="hidden lg:block w-1/4 bg-primary" />

                <div className="w-full md:w-auto">
                  <p className="font-bold text-lg md:text-xl">
                    Inquiry on {property?.title}{" "}
                    <span className="text-primary underline font-semibold">
                      #{lead._id.slice(-5)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="px-5 space-y-4">
                <div className="w-full rounded-2xl bg-blue-100 mx-auto px-3 sm:px-6 relative py-10">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit rounded-3xl py-2 px-7 bg-primary text-white text-sm">
                    {format(new Date(lead.createdAt), "dd-MM-yyyy")}
                  </span>
                  <p className="text-blue-500 text-center px-4 sm:px-8">
                    {lead.sourceDetails ||
                      "Hello, I am interested in this property. Please provide more details."}
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

          <Card className="w-full lg:flex-[1.9]">
            <div className="flex items-center pt-6 px-10 gap-3">
              <TbCircleDashed className="text-primary" size={25} />
              <h2 className="font-semibold text-black font-rubik text-lg">
                Recent Activity
              </h2>
            </div>

            <div className="space-y-4 py-6 px-10">
              <div className="flex items-start justify-between px-4 py-2.5 rounded-xl bg-blue-50">
                <div>
                  <h3 className="font-medium text-gray-900">Lead Created</h3>
                  <p className="text-gray-500 text-sm">
                    System automatic lead capture
                  </p>
                </div>
                <span className="text-gray-500 text-sm whitespace-nowrap">
                  {format(new Date(lead.createdAt), "hh:mm a")}
                </span>
              </div>
              <div className="flex items-start justify-between px-4 py-2.5 rounded-xl bg-orange-50">
                <div>
                  <h3 className="font-medium text-gray-900">Status Update</h3>
                  <p className="text-gray-500 text-sm">
                    Updated to {lead.status}
                  </p>
                </div>
                <span className="text-gray-500 text-sm whitespace-nowrap">
                  Recently
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <CreateBookingModal
        agentId={lead.agentId}
        clientId={lead.clientId}
        isOpen={isOpen}
        leadId={lead._id}
        propertyId={lead.propertyId}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
