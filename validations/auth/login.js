const Joi = require('joi-oid');

const login = (data) => {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(10).required(),
  });
  return loginSchema.validate(data);
};

module.exports = login;
