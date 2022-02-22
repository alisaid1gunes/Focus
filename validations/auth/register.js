const Joi = require('joi-oid');

const register = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(10).required(),
    profileUrl: Joi.string(),
  });
  return userSchema.validate(data);
};
module.exports = register;
