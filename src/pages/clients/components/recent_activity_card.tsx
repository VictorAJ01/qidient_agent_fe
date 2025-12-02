type RecentActivityCardProps = {
  bgColor: string;
  subTitle: string;
  title: string;
  updatedAt: string;
};

export default function RecentActivityCard({
  bgColor,
  subTitle,
  title,
  updatedAt,
}: RecentActivityCardProps) {
  return (
    <div
      className={`flex justify-between items-center py-3 px-4 rounded-lg ${bgColor}`}
    >
      <div>
        <p>{title}</p>
        <p className="text-sm text-gray-500">{subTitle}</p>
      </div>
      <p className="text-sm text-gray-500">{updatedAt}</p>
    </div>
  );
}
