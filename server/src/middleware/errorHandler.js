/**
 * Global error handler middleware
 */
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const data = err.data || null;

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      data,
    },
  });
};