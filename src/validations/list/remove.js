const Joi = require('joi-oid');

const remove = (data) => {
  const listSchema = Joi.object({
    userId: Joi.objectId().required(),
    taskId: Joi.objectId().required(),
  });

  return listSchema.validate(data);
};

module.exports = remove;
