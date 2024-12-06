const {
  addTask,
  getAllTasks,
  markTaskDone,
  addSubTask,
  markSubtaskDone,
  deleteTask,
} = require("../controllers/task.controller");

const tasksRouter = require("express").Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", addTask);
tasksRouter.put("/:id/done", markTaskDone);
tasksRouter.post("/:id/subtask", addSubTask);
tasksRouter.put("/:taskId/subtask/:id/done", markSubtaskDone);
tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
