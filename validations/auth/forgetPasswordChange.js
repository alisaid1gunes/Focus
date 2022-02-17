const Joi = require('joi-oid');

const forgetPasswordChange = (data) => {
  const forgetPasswordChangeSchema = Joi.object({
    id: Joi.objectId().required(),
    newPassword: Joi.string().min(8).max(10).required(),
  });

  return forgetPasswordChangeSchema.validate(data);
};

module.exports = forgetPasswordChange;
