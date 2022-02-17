const Joi = require('joi-oid');

const getAll = (data) => {
  const listSchema = Joi.object({
    userId: Joi.objectId().required(),
  });

  return listSchema.validate(data);
};

module.exports = getAll;
