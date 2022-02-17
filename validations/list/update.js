const Joi = require('joi-oid');

const update = (data) => {
  const listSchema = Joi.object({
    name: Joi.string().min(1).max(25),
    userId: Joi.objectId(),
    done: Joi.boolean(),
  });

  return listSchema.validate(data);
};

module.exports = update;
