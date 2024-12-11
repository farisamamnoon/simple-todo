const express = require("express");
const { updateSubtask } = require("../controllers/subtask.controller");

const subtaskRouter = express.Router();

subtaskRouter.put("/:id", updateSubtask);

module.exports = subtaskRouter;
