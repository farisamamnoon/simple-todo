import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTasks } from "../../queries/tasks";
import { request } from "../../utils/request";

export const DeleteTask = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => request(`tasks/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
    },
  });
  return (
    <div className="fixed inset-0 bg-pink-400/20 ">
      <div className="fixed top-10 mx-4 inset-x-0 md:inset-x-1/4 lg:inset-x-1/3  p-6 bg-pink-200/95 flex flex-col gap-6 rounded">
        <h1 className=" text-l">Do you want to permanently delete the task?</h1>
        <div className="flex justify-between gap-4">
          <button
            className="flex-grow py-2 border-2 border-primary rounded 0 hover:border-primary/80"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-grow py-2 bg-primary text-white font-semibold rounded hover:bg-opacity-90"
            onClick={() => {
              mutation.mutate();
            }}
            disabled={mutation.isPending}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
