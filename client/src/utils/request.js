export async function request(route, method = "GET", data, config) {
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const user = localStorage.getItem("TODO_APP_USER");
  if (user) {
    options.headers["Authorization"] = `Bearer ${user}`;
  }

  if (config) {
    options = { ...options, ...config };
  }

  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`/api/${route}`, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
}
