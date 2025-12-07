type UserDetailsCardProps = {
  title: string;
  value: string | undefined;
};

export default function UserDetailsCard({
  title,
  value,
}: UserDetailsCardProps) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="font-medium text-base">{value}</p>
    </div>
  );
}
