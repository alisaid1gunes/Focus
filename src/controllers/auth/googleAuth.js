const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const googleAuth = async (req, res, next, GoogleAuthService) => {
  const { tokenId, imageUrl } = req.body;

  client
    .verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      const { email, name } = response;
      try {
        const result = GoogleAuthService.Auth(email, name, imageUrl);

        if (result.success) {
          return res.status(StatusCodes.OK).send({
            result,
          });
        }
        next(ApiErrorService.badRequest(result.error));
      } catch (err) {
        next(
          ApiErrorService.badRequest(
            `Google authentication could not be completed. Request is wrong. Error:${err}`
          )
        );
      }
    });
};

module.exports = googleAuth;
