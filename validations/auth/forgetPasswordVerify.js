const Joi = require('joi-oid');

const forgetPasswordVerify = (data) => {
  const forgetPasswordVerifySchema = Joi.object({
    id: Joi.objectId().required(),
    verificationCode: Joi.number().min(4).max(4).required(),
  });

  return forgetPasswordVerifySchema.validate(data);
};

module.exports = forgetPasswordVerify;
