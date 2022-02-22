const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const getProfilePic = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).sendFile(req.body.url, { root: './' });
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıt bulunamadı. İstek yanlış. Hata:${err}`)
    );
  }
};

module.exports = getProfilePic;
