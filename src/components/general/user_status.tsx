import React from "react";

export type UserStatus =
  | "active"
  | "inactive"
  | "deleted"
  | "suspended"
  | "blocked"
  | string;

type UserStatusProps = {
  status: UserStatus;
  size?: "sm" | "md" | "lg";
};

const UserStatusBadge: React.FC<UserStatusProps> = ({
  status,
  size = "md",
}) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          label: "Active",
          dotColor: "bg-green-400",
          dotBorderColor: "border-green-400",
        };
      case "blocked":
        return {
          dotColor: "bg-red-400",
          dotBorderColor: "border-red-400",
          label: "Blocked",
        };
      case "inactive":
        return {
          dotBorderColor: "border-gray-400",
          label: "Inactive",
          dotColor: "bg-gray-400",
        };
      case "pending":
        return {
          dotBorderColor: "border-yellow-400",
          label: "Pending",
          dotColor: "bg-yellow-400",
        };
      case "suspended":
        return {
          dotBorderColor: "border-yellow-400",
          label: "Suspended",
          dotColor: "bg-yellow-400",
        };
      default:
        return {
          dotBorderColor: "border-gray-400",
          label: "Unknown",
          dotColor: "bg-gray-400",
        };
    }
  };

  const config = getStatusConfig();

  // Size classes
  const sizeClasses = {
    sm: {
      dot: "h-2 w-2",
      text: "text-xs",
    },
    md: {
      dot: "h-2.5 w-2.5",
      text: "text-sm",
    },
    lg: {
      dot: "h-3 w-3",
      text: "text-base",
    },
  };

  return (
    <div className="flex items-center gap-2">
      <div
        aria-hidden="true"
        className={`p-0.5 border rounded-full ${config.dotBorderColor}`}
      >
        <div
          className={`${sizeClasses[size].dot} ${config.dotColor} rounded-full`}
        />
      </div>
      <p className="font-medium text-xs text-grey-02">{config.label}</p>
    </div>
  );
};

export default UserStatusBadge;
