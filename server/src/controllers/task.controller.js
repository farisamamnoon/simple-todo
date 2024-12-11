const SubtaskModel = require("../models/subtask.model");
const TaskModel = require("../models/task.model");
const UserModel = require("../models/user.model");
const { delay } = require("../utils/delay");

const addTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, done, subtasks } = req.body;
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

    if (subtasks.length > 0) {
      await Promise.all(
        subtasks.map(({ title, done }) =>
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
      include: {
        model: SubtaskModel,
        as: "subtasks",
      },
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

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, done } = req.body;
    await TaskModel.update(
      { title, description, dueDate, done },
      { where: { id } }
    );
    res.status(200).json({
      success: true,
      message: "Updated task",
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
  updateTask,
  addSubTask,
  deleteTask,
};
