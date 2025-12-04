import { MdOutlineAttachFile } from "react-icons/md";

type AmenitiesCardProps = {
  title: string;
};

export default function DocumentsCard({ title }: AmenitiesCardProps) {
  return (
    <div className="bg-light-primary-bg-50 rounded-xl px-4 h-24 flex flex-col justify-center items-center gap-2">
      <div className="flex items-center gap-2">
        <MdOutlineAttachFile className="text-2xl" />
        <p className="text-sm font-medium text-black2">{title}</p>
      </div>
      <div className="underline text-primary text-sm font-bold">View now</div>
    </div>
  );
}
