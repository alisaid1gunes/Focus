const Joi = require('joi-oid');

const save = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(1).max(25).required(),
    done: Joi.boolean().required(),
  });

  return taskSchema.validate(data);
};

module.exports = save;
