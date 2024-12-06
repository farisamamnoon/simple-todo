const SubtaskModel = require("../models/subtask.model");
const TaskModel = require("../models/task.model");
const UserModel = require("../models/user.model");

const addTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, done, subTasks } = req.body;
    const { user } = req;
    const {
      dataValues: { id },
    } = await TaskModel.create({
      title,
      description,
      dueDate,
      done,
      UserId: user.id,
    });
    if (subTasks.length > 0) {
      await Promise.all(
        subTasks.map(({ title, done }) =>
          SubtaskModel.create({ title, done, TaskId: id })
        )
      );
    }

    res.status(200).json({
      success: true,
      message: "Task created",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await TaskModel.findAll({
      where: { UserId: user.id },
      include: SubtaskModel,
    });

    res.status(200).json({
      success: true,
      message: "Fetched all tasks",
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const markTaskDone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { done } = req.body;
    await TaskModel.update({ done }, { where: { id } });
    res.status(200).json({
      success: true,
      message: "Marked task done",
    });
  } catch (error) {
    next(error);
  }
};

const addSubTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;
    await SubtaskModel.create({ title, done, TaskId: id });
    res.status(200).json({
      success: true,
      message: "Added subtask",
    });
  } catch (error) {
    next(error);
  }
};

const markSubtaskDone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { done } = req.body;
    await SubtaskModel.update({ done }, { where: { id } });
    res.status(200).json({
      success: true,
      message: "Marked subtask done",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TaskModel.destroy({ where: { id } });
    res.status(200).json({
      success: true,
      message: "Deleted task",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTask,
  getAllTasks,
  markTaskDone,
  addSubTask,
  deleteTask,
  markSubtaskDone,
};
