import { zodResolver } from "@hookform/resolvers/zod";
import { Badge, BadgeCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const AddTask = ({ onClose }) => {
  const [subtasks, setSubtasks] = useState([]);
  const subtaskInput = useRef(null);
  const {} = useForm({ resolver: zodResolver() });

  const addSubTask = () => {
    const curr = subtaskInput.current.value;
    setSubtasks([...subtasks, { title: curr, done: false }]);
    subtaskInput.current.value = "";
  };

  return (
    <div className="absolute inset-0 bg-pink-400/20 ">
      <div className="absolute top-10 mx-4 inset-x-0 md:inset-x-1/4 lg:inset-x-1/3  p-6 bg-pink-200/95 flex flex-col gap-6 rounded">
        <h1 className=" text-2xl text-center">Add a new Task</h1>
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Title:</label>
            <input
              //   {...register("userName")}
              placeholder="Enter task title"
              className="bg-inherit shadow px-4 py-2 text-blue-950 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Description:</label>
            <input
              //   {...register("userName")}
              placeholder="Enter task description"
              className="bg-inherit shadow px-4 py-2 text-blue-950 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Due Date:</label>
            <input
              //   {...register("userName")}
              placeholder="Enter your target date"
              className="bg-inherit shadow px-4 py-2 text-blue-950 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Subtasks:</label>
            <div className="flex gap-6">
              <input
                ref={subtaskInput}
                //   {...register("userName")}
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
          </div>
          <div>
            {subtasks.map(({ title, done }) => (
              <div className="flex gap-4 content-center p-2">
                {done ? <BadgeCheck /> : <Badge />}
                <p className="text-lg">{title}</p>
              </div>
            ))}
          </div>
        </form>
        <div className="flex justify-between gap-4">
          <button
            className="flex-grow py-2 border-2 border-primary rounded 0 hover:border-primary/80"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-grow py-2 bg-primary text-white font-semibold rounded hover:bg-opacity-90"
            // onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
