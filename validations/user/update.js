const Joi = require('joi-oid');

const update = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(10),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(10),
  });

  return userSchema.validate(data);
};
module.exports = update;
