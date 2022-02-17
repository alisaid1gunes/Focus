const Joi = require('joi-oid');

const update = (data) => {
  const taskSchema = Joi.object({
    name: Joi.string().min(1).max(25),
    userId: Joi.objectId(),
    done: Joi.boolean(),
  });

  return taskSchema.validate(data);
};

module.exports = update;
