const SubtaskModel = require("../models/subtask.model");

const updateSubtask = async (req, res, next) => {
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

module.exports = { updateSubtask };
