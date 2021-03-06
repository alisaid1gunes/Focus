const ApiError = require('../services/ApiError');

function apiErrorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json({ message: err.message, success: false });
    return;
  }

  res.status(500).json('something went wrong');
}
module.exports = apiErrorHandler;
