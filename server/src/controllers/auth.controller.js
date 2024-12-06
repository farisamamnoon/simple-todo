const { UniqueConstraintError } = require("sequelize");
const UserModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Access granted",
      data: {
        isAuthenticated: true,
        data: req.user,
      },
    });
  } else {
    next(new ApiError(401, "Login credentials was not found"));
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const { dataValues: user } = await UserModel.findOne({
      where: { userName },
    });
    if (!user) {
      throw new ApiError(404, "User with the email not found");
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new ApiError(401, "Credentials do not match");
    }

    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "User successfully created",
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const salt = bcrypt.genSaltSync();

    const hashed = bcrypt.hashSync(password, salt);

    const { dataValues: user } = await UserModel.create({
      userName,
      password: hashed,
    });

    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY);
    res.status(200).json({
      success: true,
      message: "Login successfull",
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof UniqueConstraintError) {
      error = new ApiError(409, "Username already exists");
    }
    next(error);
  }
};

module.exports = { getUser, login, register };