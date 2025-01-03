require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError.js");
const errorHandler = require("./middlewares/error-handler.middleware.js");
const authRouter = require("./routers/auth.router.js");
const tasksRouter = require("./routers/task.router.js");
const dbInit = require("./utils/initDb.js");
const { authenticate } = require("./middlewares/auth.middleware.js");
const subtaskRouter = require("./routers/subtask.router.js");

const app = express();
const origin =
  process.env.STATUS === "development"
    ? process.env.FRONTEND_DEV_URL
    : process.env.FRONTEND_PROD_URL;
app.use(
  cors({
    origin,
  })
);
app.use(express.json());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", authenticate, tasksRouter);
app.use("/api/subtasks", authenticate, subtaskRouter);

// 404 not found error handler
app.use((req, res, next) => {
  const error = new ApiError(404, "Page Not Found");
  next(error);
});
// Base error handler
app.use(errorHandler);

app.listen(process.env.PORT, "0.0.0.0", async () => {
  await dbInit();
  console.log(`Your server is listening to ${process.env.PORT || 8080}`);
});
