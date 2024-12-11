const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { getUser, login, register,logout } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.get("/user", authenticate, getUser);
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);

module.exports = authRouter;
