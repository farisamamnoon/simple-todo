const {
  addTask,
  getAllTasks,
  updateTask,
  addSubTask,
  deleteTask,
} = require("../controllers/task.controller");

const tasksRouter = require("express").Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", addTask);
tasksRouter.put("/:id", updateTask);
tasksRouter.post("/:id/subtask", addSubTask);
tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
