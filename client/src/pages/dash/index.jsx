import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Task } from "../../components/task/task";
import { Loading } from "../../components/loading";
import { request } from "../../utils/request";
import { LogOut } from "lucide-react";
import { AddTask } from "../../components/task/add-task-modal";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => request("tasks"),
  });
  const { mutate } = useMutation({
    mutationFn: () => request("auth/logout", "POST"),
    onSuccess: () => {
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      queryClient.clear();
      navigate("/auth/login");
    },
  });

  if (isPending) return <Loading />;
  if (isError) return <Navigate to="/auth/login" />;

  useEffect(
    () => () =>
      (document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;")
  );

  return (
    <div className="bg-primary-gradient bg-fixed bg-no-repeat min-w-screen min-h-screen py-20 px-10">
      <div className="fixed right-2 top-2 md:right-8 md:top-8">
        <button
          className="text-3xl bg-blue-600/90 text-pink-200 p-2 md:p-3 lg:p-4 rounded-full"
          onClick={() => mutate()}
        >
          <LogOut />
        </button>
      </div>
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
      <AddTask />
    </div>
  );
};
