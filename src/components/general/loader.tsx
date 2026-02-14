import { Spinner } from "@heroui/react";

type LoaderProps = {
  message: string;
};

export default function Loader({ message }: LoaderProps) {
  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-3 font-medium text-system-gray-dark-300">
      <Spinner color="primary" size="lg" />
      <p>{message}</p>
    </div>
  );
}
