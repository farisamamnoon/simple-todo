import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const getUser = () => {
    return fetch(`https://localhost:8080/api/auth/status`);
  };

  return useQuery({ queryKey: "user", queryFn: getUser });
};
