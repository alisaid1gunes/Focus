const Joi = require('joi-oid');

const save = (data) => {
  const listSchema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(1).max(25).required(),
    tasks: Joi.array().items(Joi.objectId()).required(),
  });

  return listSchema.validate(data);
};

module.exports = save;
