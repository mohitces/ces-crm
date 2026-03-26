const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    message = 'Validation failed';
  }

  if (err instanceof mongoose.Error.CastError) {
    message = 'Invalid resource id';
  }

  if (err.code === 11000) {
    message = 'Duplicate value error';
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
