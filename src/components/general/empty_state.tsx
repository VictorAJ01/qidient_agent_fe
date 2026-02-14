import { IconType } from "react-icons";

type EmptyStateProps = {
  icon: IconType;
  message: string;
};

export default function EmptyState({
  icon,
  message,
}: EmptyStateProps): JSX.Element {
  const IconComponent = icon;

  return (
    <div className="w-full flex flex-col flex-grow items-center justify-center">
      <IconComponent className="text-4xl" />
      <p>{message}</p>
    </div>
  );
}
