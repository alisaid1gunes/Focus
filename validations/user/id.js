const Joi = require('joi-oid');

const id = (data) => {
  const idSchema = Joi.object({
    id: Joi.objectId().required(),
  });

  return idSchema.validate(data);
};

module.exports = id;
