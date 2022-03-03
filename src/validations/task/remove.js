const Joi = require('joi-oid');

const remove = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
    taskId: Joi.objectId().required(),
  });

  return taskSchema.validate(data);
};

module.exports = remove;
