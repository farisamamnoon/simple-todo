import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, BadgeCheck } from "lucide-react";
import { request } from "../../utils/request";

export const SubTask = ({ id, title, done }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => request(`subtasks/${id}`, "PUT", values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateSubtask = () => {
    let updatedDone = !done;
    mutate({ done: updatedDone });
  };

  if (isError) {
    //TODO: come back...
    return <p>Error</p>;
  }
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
    </>
  );
};
