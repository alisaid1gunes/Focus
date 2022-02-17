const Joi = require('joi-oid');

const get = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
  });

  return taskSchema.validate(data);
};

module.exports = get;
