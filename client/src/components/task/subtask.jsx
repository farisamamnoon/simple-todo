import { Badge, BadgeCheck } from "lucide-react";

export const SubTask = ({ title, done }) => {
  return (
    <li className="flex gap-2">
      <button>{done ? <BadgeCheck size={20} /> : <Badge size={20} />}</button>
      <p>{title}</p>
    </li>
  );
};
