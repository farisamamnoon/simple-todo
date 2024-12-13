import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { SubTask } from "./subtask";
import { Trash } from "lucide-react";
import { DeleteTask } from "./delete-task-model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../utils/request";
import { Notification, useNotification } from "../notification";
import { useOptimistic } from "react";

export const Task = ({ task }) => {
  const { notify, ...notifyProps } = useNotification();
  const [deleteTask, setDeleteTask] = useState({ toggle: false, id: "" });
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => request(`tasks/${task.id}`, "PUT", values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  //TODO: Somehow this is not working...
  const [optiTask, addOptiTask] = useOptimistic(
    task,
    (currTask, updatedTask) => {
      console.log({ ...currTask, ...updatedTask });
      return { ...currTask, ...updatedTask };
    }
  );

  const updateAction = () => {
    addOptiTask({ done: !optiTask.done });
    mutate({
      ...optiTask,
      subtasks: [...optiTask.subtasks],
      done: !optiTask.done,
    });
  };

  useEffect(() => {
    if (isError) {
      notify(error.message);
    }
  }, [isError]);

  return (
    <>
      <div
        className={`bg-pink-200/80 rounded-lg shadow-md p-8 flex flex-col gap-2`}
      >
        <div className="flex flex-col-reverse md:flex-row justify-between gap-2">
          <h1 className="text-3xl flex gap-2 content-center">
            {optiTask.title}
            <button
              onClick={() => setDeleteTask({ toggle: true, id: optiTask.id })}
            >
              <Trash size={20} className="text-red-900" />
            </button>
          </h1>
          <form action={updateAction}>
            {isPending && (
              <span className="text-black/50 text-sm">Pending...</span>
            )}
            <button
              className={`bg-pink-900 px-2 py-1 text-pink-100 rounded-md shadow hover:bg-opacity-80 ${optiTask.done && 'bg-green-800'}`}
            >
              {optiTask.done ? "Completed" : "Mark Done"}
            </button>
          </form>
        </div>
        <p className="text-black text-opacity-75 text-lg">
          Due on {formatDate(optiTask.dueDate)}
        </p>
        <p>{optiTask.description}</p>
        <ul className="mt-2">
          {optiTask.subtasks.map((subtask) => (
            <SubTask {...subtask} key={subtask.id} addOptiTask={addOptiTask} />
          ))}
        </ul>
        {deleteTask.toggle && (
          <DeleteTask
            id={deleteTask.id}
            onClose={() => setDeleteTask({ toggle: false, id: "" })}
          />
        )}
      </div>
      <Notification {...notifyProps} />
    </>
  );
};
