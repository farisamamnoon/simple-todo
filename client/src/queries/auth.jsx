import { useMutation } from "@tanstack/react-query";
import { request } from "../utils/request";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

export const useMutateTasks = (data) => {
  const { data, isPending, isError, error } = useMutation({
    mutationFn: () => request("/tasks", "POST", data),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }
};
