const Joi = require('joi-oid');

const getOne = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
  });

  return taskSchema.validate(data);
};

module.exports = getOne;
