const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError");
const errorHandler = require("./middlewares/error-handler.middleware");
const authRouter = require("./routers/auth.router");
const tasksRouter = require("./routers/task.router");
const dbInit = require("./utils/initDb.js");
const UserModel = require("./models/user.model");
const { authenticate } = require("./middlewares/auth.middleware");
const subtaskRouter = require("./routers/subtask.router.js");

require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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

app.listen(process.env.PORT, async () => {
  await dbInit();
  console.log(`Your server is listening to ${process.env.PORT}`);
});
