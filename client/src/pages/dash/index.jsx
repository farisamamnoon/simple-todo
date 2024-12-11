import { useQuery } from "@tanstack/react-query";
import { Task } from "../../components/task/task";
import { useTasks } from "../../queries/tasks";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import { request } from "../../utils/request";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddTask } from "../../components/task/add-task-modal";

const initData = [
  {
    id: 1,
    title: "test",
    description: "test of the description",
    dueDate: new Date(2024, 11, 4),
    done: true,
    subTasks: [
      {
        id: 1,
        title: "subtask Test",
        done: false,
      },
    ],
  },
  {
    id: 2,
    title: "test",
    description: "test of the description",
    dueDate: new Date(2024, 11, 4),
    done: false,
    subTasks: [
      {
        id: 1,
        title: "subtask Test",
        done: false,
      },
      {
        id: 2,
        title: "subtask Test",
        done: true,
      },
    ],
  },
];

export const Dashboard = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => request("tasks"),
  });

  if (isPending) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <div className="bg-primary-gradient bg-fixed bg-no-repeat min-w-screen min-h-screen py-20 px-10">
      <div className="w-full md:w-1/2 lg:1/4 mx-auto flex flex-col gap-8">
        {data.data === null ||
          data.data === undefined ||
          (!Array.isArray(data.data) && <p>No Tasks...Try creating one</p>)}
        {data.data.map((task) => (
          <Task {...task} key={task.id} />
        ))}
      </div>
      <AddTask />
    </div>
  );
};
