const errorHandler = (err, req, res, next) => {
  if (err.statusCode === 404) {
    res.status(400).json({
      success: err.success,
      message: err.message,
    });
  } else {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(err);
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

module.exports = errorHandler;
