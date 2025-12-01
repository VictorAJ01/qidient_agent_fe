import { Card, CardHeader, CardBody } from "@heroui/react";
import { HiUserCircle } from "react-icons/hi2";

type StatsCardProps = {
  title: string;
  figure: string | number;
  index: number;
};

export default function StatsCard({
  title,
  figure,
  index,
}: StatsCardProps): JSX.Element {
  const getBgColor = (index: number) => {
    const colors = [
      "bg-qidient-yellow-light/28",
      "bg-qidient-blue-light/28",
      "bg-qidient-purple-light/28",
      "bg-qidient-light-green-light/28",
      "bg-red-300/28",
      "bg-qidient-gray-light/28",
    ];

    if (index !== undefined) {
      return colors[index % colors.length];
    }

    return colors[0];
  };

  const getTextColor = (index: number) => {
    const colors = [
      "text-qidient-yellow",
      "text-primary",
      "text-qidient-purple",
      "text-qidient-light-green",
      "text-red-500",
      "text-qidient-gray",
    ];

    if (index !== undefined) {
      return colors[index % colors.length];
    }

    return colors[0];
  };

  const getBorderColor = (index: number) => {
    const colors = [
      "bg-qidient-yellow",
      "bg-primary",
      "bg-qidient-purple",
      "bg-qidient-light-green",
      "bg-red-500",
      "bg-qidient-gray",
    ];

    if (index !== undefined) {
      return colors[index % colors.length];
    }

    return colors[0];
  };

  const getShapeColor = (index: number) => {
    const colors = [
      "text-qidient-yellow/20",
      "text-primary/20",
      "text-qidient-purple/20",
      "text-qidient-light-green/20",
      "text-red-500/20",
      "text-qidient-gray/20",
    ];

    if (index !== undefined) {
      return colors[index % colors.length];
    }

    return colors[0];
  };

  return (
    <Card
      className={`w-full min-h-max ${getBgColor(index)} px-6 py-4 space-y-3 relative overflow-hidden`}
      shadow="none"
    >
      <div
        className={`absolute left-0 top-5 w-1 h-14 md:h-12 ${getBorderColor(index)}`}
      />

      <div className={`absolute -bottom-6 -right-6 ${getShapeColor(index)}`}>
        <svg
          className="w-18 h-18"
          fill="none"
          height="80"
          viewBox="0 0 80 80"
          width="80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            stroke="currentColor"
            strokeWidth="2"
            x1="5"
            x2="90"
            y1="10"
            y2="90"
          />
        </svg>
      </div>

      <CardHeader className="items-center justify-between p-0">
        <p className="text-base md:text-sm font-medium">{title}</p>
        <HiUserCircle className={`text-3xl ${getTextColor(index)}`} />
      </CardHeader>
      <CardBody className="p-2 lg:p-1 overflow-hidden">
        <h1 className="text-5xl font-medium">{figure}</h1>
      </CardBody>
    </Card>
  );
}
