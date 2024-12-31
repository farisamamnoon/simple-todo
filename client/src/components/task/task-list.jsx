import { useQuery } from "@tanstack/react-query";
import { Task } from "./task";
import { request } from "../../utils/request";
import { Loading } from "../loading";
import { Navigate } from "react-router-dom";

export const TaskList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => request("tasks"),
  });

  if (isPending) return <Loading />;
  if (isError) return <Navigate to="/auth/login" />;

  return (
    <div className="w-full md:w-1/2 lg:1/4 mx-auto flex flex-col gap-8">
      {data.data === null ||
        data.data === undefined ||
        !Array.isArray(data.data) ||
        (data.data.length === 0 && (
          <p className="text-center text-3xl text-pink-50">
            No Tasks...Try creating one
          </p>
        ))}
      {data.data.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
};
