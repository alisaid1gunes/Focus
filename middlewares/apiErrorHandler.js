const ApiErrorService = require('../services/ApiErrorService');

const apiErrorHandler = (err, res) => {
  if (err instanceof ApiErrorService) {
    res.status(err.code).json({ data: err.message, success: false });
    return;
  }

  res
    .status(500)
    .json({ data: 'Üzgünüz birşeyler yanlış gitti :(', success: false });
};

module.exports = apiErrorHandler;
