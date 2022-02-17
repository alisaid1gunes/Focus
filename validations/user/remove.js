const Joi = require('joi-oid');

const remove = (data) => {
  const userSchema = Joi.object({
    id: Joi.objectId().required(),
  });

  return userSchema.validate(data);
};

module.exports = remove;
