import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { SubTask } from "./subtask";
import { Trash } from "lucide-react";
import { DeleteTask } from "./delete-task-model";

export const Task = ({
  id,
  title,
  description,
  dueDate,
  subtasks,
  done: initDone,
}) => {
  const [done, setDone] = useState(initDone);
  const [deleteTask, setDeleteTask] = useState({ toggle: false, id: "" });

  return (
    <div className="bg-pink-200/80 rounded-lg shadow-md p-8 flex flex-col gap-2">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-2">
        <h1 className="text-3xl flex gap-2 content-center">
          {title}
          <button onClick={() => setDeleteTask({ toggle: true, id })}>
            <Trash size={20} className="text-red-900" />
          </button>
        </h1>
        <button
          className={`bg-pink-900 px-2 py-1 text-pink-100 rounded-md shadow ${
            done && "bg-opacity-20"
          } ${!done && "hover:bg-opacity-80"}`}
          onClick={() => setDone((val) => !val)}
        >
          {done ? "Completed" : "Mark Done"}
        </button>
      </div>
      <p className="text-black text-opacity-75 text-lg">
        Due on {formatDate(dueDate)}
      </p>
      <p>{description}</p>
      <ul className="mt-2">
        {subtasks.map((subtask) => (
          <SubTask {...subtask} key={subtask.id} />
        ))}
      </ul>
      {deleteTask.toggle && (
        <DeleteTask
          id={deleteTask.id}
          onClose={() => setDeleteTask({ toggle: false, id: "" })}
        />
      )}
    </div>
  );
};
