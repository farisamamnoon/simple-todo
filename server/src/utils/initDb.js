const UserModel = require("../models/user.model");
const TaskModel = require("../models/task.model");
const SubtaskModel = require("../models/subtask.model");
const db = require("./db");

const dbInit = () => {
  // user --< tasks
  UserModel.hasMany(TaskModel, { onDelete: "CASCADE", onUpdate: "CASCADE" });
  TaskModel.belongsTo(UserModel, { foreignKey: { allowNull: false } });

  // tasks --< subtasks
  SubtaskModel.belongsTo(TaskModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  TaskModel.hasMany(SubtaskModel, {
    foreignKey: { allowNull: false },
    as: "subtasks",
  });

  return db.sync();
};

module.exports = dbInit;
