import { IconType } from "react-icons";

type AmenitiesCardProps = {
  Icon: IconType;
  title: string;
};

export default function AmenitiesCard({ Icon, title }: AmenitiesCardProps) {
  return (
    <div className="bg-light-primary-bg-50 rounded-xl px-4 h-24 flex items-center justify-center gap-2">
      <Icon className="text-3xl" />
      <p className="text-sm font-extrabold text-black2">{title}</p>
    </div>
  );
}
