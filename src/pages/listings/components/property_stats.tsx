import { IconType } from "react-icons";

type PropertyStatsProps = {
  Icon: IconType;
  figure: string | number;
  title: string;
};

export default function PropertyStats({
  Icon,
  figure,
  title,
}: PropertyStatsProps) {
  return (
    <div className="space-y-4">
      <Icon className="mx-auto text-primary text-2xl" />
      <div>
        <p className="text-2xl font-normal">{figure}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}
