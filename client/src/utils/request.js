export async function request(route, method = "GET", data, config) {
  const jwt = localStorage.getItem("accessToken");

  let options = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (jwt !== undefined || jwt !== null)  {
    options.headers["authorization"] = jwt;
  }

  if (config) {
    options = { ...options, ...config };
  }

  if (data) options.body = JSON.stringify(data);

  const response = await fetch(
    `https://todo-gcmh.onrender.com/api/${route}`,
    options
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
}
