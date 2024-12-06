import { Badge, BadgeCheck } from "lucide-react";
import { useState } from "react";

export const SubTask = ({ title, initDone }) => {
  const [done, setDone] = useState(initDone);
  return (
    <li
      className="flex gap-2 cursor-pointer"
      onClick={() => setDone((val) => !val)}
    >
      <button>{done ? <BadgeCheck size={25} /> : <Badge size={25} />}</button>
      <p>{title}</p>
    </li>
  );
};
