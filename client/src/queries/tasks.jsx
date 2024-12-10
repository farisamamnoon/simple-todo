import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/request";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

export const useTasks = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: request("tasks"),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return data;
};
