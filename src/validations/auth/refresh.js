const Joi = require('joi-oid');

const refresh = (data) => {
  const refreshSchema = Joi.object({
    refreshToken: Joi.string().required(),
  });

  return refreshSchema.validate(data);
};

module.exports = refresh;
