const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const tasksRouter = require("express").Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", addTask);
tasksRouter.put("/:id", updateTask);
tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
