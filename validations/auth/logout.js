const Joi = require('joi-oid');

const logout = (data) => {
  const logoutSchema = Joi.object({
    refreshToken: Joi.string().required(),
  });

  return logoutSchema.validate(data);
};

module.exports = logout;
