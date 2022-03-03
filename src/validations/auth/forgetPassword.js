const Joi = require('joi-oid');

const forgetPassword = (data) => {
  const forgetPasswordSchema = Joi.object({
    id: Joi.objectId().required(),
  });

  return forgetPasswordSchema.validate(data);
};

module.exports = forgetPassword;
