import { queryOptions } from "@tanstack/react-query";

export const usersOptions = queryOptions({
  queryKey: ["users"],
  queryFn: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    return response.json();
  },
});
