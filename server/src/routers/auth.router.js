const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { getUser, login, register } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.get("/user", authenticate, getUser);
authRouter.post("/login", login);
authRouter.post("/register", register);

module.exports = authRouter;
