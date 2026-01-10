export type Status =
  | "active"
  | "inactive"
  | "deleted"
  | "suspended"
  | "blocked"
  | "accepted"
  | "pending"
  | "rejected"
  | string;

type StatusProps = {
  status: Status;
  size?: "sm" | "md" | "lg";
};

export default function StatusBadge({ status, size = "md" }: StatusProps) {
  const getStatusConfig = () => {
    // Normalize status to lowercase to ensure case-insensitive matching
    const normalizedStatus = status.toLowerCase();

    switch (normalizedStatus) {
      // Green / Success States
      case "active":
      case "accepted":
        return {
          label:
            normalizedStatus.charAt(0).toUpperCase() +
            normalizedStatus.slice(1), // Capitalizes first letter
          dotColor: "bg-green-400",
          dotBorderColor: "border-green-400",
        };

      // Red / Danger / Error States
      case "blocked":
      case "rejected":
      case "deleted":
        return {
          dotColor: "bg-red-400",
          dotBorderColor: "border-red-400",
          label:
            normalizedStatus.charAt(0).toUpperCase() +
            normalizedStatus.slice(1),
        };

      // Yellow / Warning / Waiting States
      case "pending":
      case "suspended":
        return {
          dotBorderColor: "border-yellow-400",
          label:
            normalizedStatus.charAt(0).toUpperCase() +
            normalizedStatus.slice(1),
          dotColor: "bg-yellow-400",
        };

      // Gray / Neutral States
      case "inactive":
        return {
          dotBorderColor: "border-gray-400",
          label: "Inactive",
          dotColor: "bg-gray-400",
        };

      // Fallback
      default:
        return {
          dotBorderColor: "border-gray-400",
          label: status || "Unknown",
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
      {/* Assuming text-grey-02 is a custom color in your tailwind config */}
      <p className={`font-medium ${sizeClasses[size].text} text-grey-02`}>
        {config.label}
      </p>
    </div>
  );
}
