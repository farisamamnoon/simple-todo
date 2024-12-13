export async function request(route, method = "GET", data, config) {

  let options = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (config) {
    options = { ...options, ...config };
  }

  if (data) options.body = JSON.stringify(data);

  const response = await fetch(
    `http://localhost:8080/api/${route}`,
    options
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
}
