import { useContext } from "react";
import { formatDate } from "../../utils/formatDate";
import { SubTask } from "./subtask";
import { DispatchContext } from "../../pages/dash";

export const Task = ({ id, title, description, dueDate, subTasks, done }) => {
  const setData = useContext(DispatchContext);

  return (
    <div className="bg-pink-200/80 rounded-lg shadow-md p-8 flex flex-col gap-2">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-2">
        <h1 className="text-3xl">{title}</h1>
        <button
          className={`bg-pink-900 px-2 py-1 text-pink-100 rounded-md shadow ${
            done && "bg-opacity-20"
          } ${!done && "hover:bg-opacity-80"}`}
          // onClick={() =>
          //   setData((prev) => {
          //     const oldTasks = prev;
          //     const targetTask = oldTasks.find((task) => task.id === id);
          //     const taskStatus = targetTask.done;
          //     targetTask.done = !taskStatus;
          //     console.log([...prev, targetTask]);

          //     return [...prev, targetTask];
          //   })
          // }
        >
          {done ? "Completed" : "Mark Done"}
        </button>
      </div>
      <p className="text-black text-opacity-75 text-lg">
        Due on {formatDate(dueDate)}
      </p>
      <p>{description}</p>
      <ul className="">
        {subTasks.map((subTask) => (
          <SubTask {...subTask} key={subTask.id} />
        ))}
      </ul>
    </div>
  );
};
