import { zodResolver } from "@hookform/resolvers/zod";
import { Badge, BadgeCheck, ChevronUp, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { newTaskSchema } from "../../utils/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../utils/request";
import { useNotification } from "../notification";

export const AddTask = () => {
  const queryClient = useQueryClient();
  const { notify, ...notifyProps } = useNotification();
  const [open, setOpen] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const subtaskInput = useRef(null);
  const { register, setValue, formState, handleSubmit, reset } = useForm({
    resolver: zodResolver(newTaskSchema),
  });
  const mutate = useMutation({
    mutationFn: (values) => request("tasks", "POST", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSubtasks([]);
      setOpen(false);
      reset();
    },
  });
  useEffect(() => {
    if (mutate.isError) {
      notify(mutate.error.message);
    }
  }, [mutate.isError]);

  const addSubTask = () => {
    const newSubtask = subtaskInput.current.value;
    const newSubtaskArray = [...subtasks, { title: newSubtask, done: false }];

    setSubtasks(newSubtaskArray);
    setValue("subtasks", newSubtaskArray);
    subtaskInput.current.value = "";
  };

  return (
    <div
      className={`transition-transform fixed mx-4 inset-x-0 md:inset-x-1/4 lg:inset-x-1/3  p-6 bg-pink-200 flex flex-col gap-6 rounded-lg ${
        open ? "top-10" : "bottom-full has-[:hover]:translate-y-1"
      }`}
    >
      <h1 className=" text-2xl text-center font-semibold mb-4">
        Add a new Task
      </h1>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit((values) => {
          mutate.mutate(values);
        })}
      >
        <div className="flex flex-col gap-4">
          <label className="text-blue-950">Title:</label>
          <input
            {...register("title")}
            placeholder="Enter task title"
            className="bg-inherit shadow px-4 py-2 text-blue-950 rounded-md"
          />
          <p className="text-red-500 font-semibold">
            {formState.errors?.title?.message}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-blue-950">Description:</label>
          <input
            {...register("description")}
            placeholder="Enter task description"
            className="bg-inherit shadow px-4 py-2 text-blue-950 rounded-md"
          />
          <p className="text-red-500 font-semibold">
            {formState.errors?.description?.message}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-blue-950">Due Date:</label>
          <input
            type="date"
            {...register("dueDate")}
            placeholder="Enter your target date"
            className="bg-inherit shadow px-4 py-2 text-blue-950 rounded-md"
          />
          <p className="text-red-500 font-semibold">
            {formState.errors?.dueDate?.message}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-blue-950">Subtasks:</label>
          <div className="flex flex-col md:flex-row gap-6">
            <input
              ref={subtaskInput}
              placeholder="Add any subtasks"
              className="bg-inherit shadow px-4 py-2 text-blue-950 rounded-md flex-grow"
            />
            <button
              className="px-4 py-2 bg-primary/90 text-white rounded"
              onClick={addSubTask}
              type="button"
            >
              Add
            </button>
          </div>
          <p className="text-red-500 font-semibold">
            {formState.errors?.subtasks?.message}
          </p>
        </div>
        <div>
          {subtasks.map(({ title, done }, index) => (
            <div
              className="flex gap-4 content-center p-2"
              key={`${index}-${title}`}
            >
              {done ? <BadgeCheck /> : <Badge />}
              <p className="text-lg">{title}</p>
            </div>
          ))}
        </div>
        <button
          className="flex-grow py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-opacity-90"
          disabled={mutate.isPending}
        >
          {mutate.isPending ? "Adding the task..." : "Add Task"}
        </button>
      </form>
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 bg-pink-200 text-pink-900 w-max rounded-b-lg mx-auto p-2 hover:translate-y-0"
        onClick={() => {
          reset();
          setSubtasks([]);
          setOpen(!open);
        }}
      >
        {open ? (
          <ChevronUp
            strokeWidth={3}
            size={40}
            className="hover:-translate-y-1 transition-transform"
          />
        ) : (
          <Plus strokeWidth={3} size={40} />
        )}
      </div>
    </div>
  );
};
