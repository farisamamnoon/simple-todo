const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      throw new ApiError(403, "No authentication provided");
    }
    token = token.split(" ")[1];

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!user) {
      throw new ApiError(401, "Authentication verification failed");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof JsonWebTokenError) {
      error = new ApiError(401, "Invalid or expired token");
    }
    next(error);
  }
};

module.exports = { authenticate };
