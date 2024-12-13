import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, BadgeCheck } from "lucide-react";
import { request } from "../../utils/request";
import { useEffect } from "react";
import { Notification, useNotification } from "../notification";

export const SubTask = ({ id, title, done }) => {
  const { notify, ...notifyProps } = useNotification();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => request(`subtasks/${id}`, "PUT", values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateSubtask = () => {
    let updatedDone = !done;
    mutate({ done: updatedDone });
  };

  useEffect(() => {
    if (isError) {
      notify(error.message);
    }
  }, [isError]);
  return (
    <>
      <li className="flex gap-2 cursor-pointer" onClick={updateSubtask}>
        <button disabled={isPending}>
          {done ? <BadgeCheck size={25} /> : <Badge size={25} />}
        </button>
        <p>
          {title}{" "}
          <span className="text-black/50">{isPending && "Loading..."}</span>
        </p>
      </li>
      <Notification {...notifyProps} />
    </>
  );
};
