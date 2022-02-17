const Joi = require('joi-oid');

const changePassword = (data) => {
  const changePasswordSchema = Joi.object({
    id: Joi.objectId().required(),
    oldPassword: Joi.string().min(8).max(10).required(),
    newPassword: Joi.string().min(8).max(10).required(),
  });

  return changePasswordSchema.validate(data);
};

module.exports = changePassword;
