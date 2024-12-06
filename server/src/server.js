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

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", authenticate, tasksRouter);

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
