const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const authenticate = async (req, res, next) => {
  try {
    let token =
      req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new ApiError(403, "No authentication provided");
    }

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
