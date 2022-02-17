const Joi = require('joi-oid');

const getAll = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
  });

  return taskSchema.validate(data);
};

module.exports = getAll;
