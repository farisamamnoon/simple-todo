import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { SubTask } from "./subtask";
import { Trash } from "lucide-react";
import { DeleteTask } from "./delete-task-model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../utils/request";

export const Task = ({ task }) => {
  const [deleteTask, setDeleteTask] = useState({ toggle: false, id: "" });
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => request(`tasks/${task.id}`, "PUT", values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateAction = async () => {
    // await new Promise((res) => {
    //   setTimeout(() => res(), 1000);
    // });
    mutate({
      ...task,
      subtasks: [...task.subtasks],
      done: !task.done,
    });
  };

  if (isError) {
    //TODO: Fix this..
    return <p>error..</p>;
  }

  return (
    <>
      <div
        className={`bg-pink-200/80 rounded-lg shadow-md p-8 flex flex-col gap-2`}
      >
        <div className="flex flex-col-reverse md:flex-row justify-between gap-2">
          <h1 className="text-3xl flex gap-2 content-center">
            {task.title}
            <button
              onClick={() => setDeleteTask({ toggle: true, id: task.id })}
            >
              <Trash size={20} className="text-red-900" />
            </button>
          </h1>
          <form action={updateAction}>
            <button
              className={`px-2 py-1 text-pink-100 rounded-md shadow hover:bg-opacity-80 disabled:bg-opacity-50 ${
                task.done ? "bg-green-800" : "bg-pink-900"
              }`}
              disabled={isPending}
            >
              {isPending ? "Loading..." : task.done ? "Completed" : "Mark Done"}
            </button>
          </form>
        </div>
        <p className="text-black text-opacity-75 text-lg">
          Due on {formatDate(task.dueDate)}
        </p>
        <p>{task.description}</p>
        <ul className="mt-2">
          {task.subtasks.map((subtask) => (
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
    </>
  );
};
