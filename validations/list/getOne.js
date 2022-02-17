const Joi = require('joi-oid');

const getOne = (data) => {
  const listSchema = Joi.object({
    userId: Joi.objectId().required(),
  });

  return listSchema.validate(data);
};

module.exports = getOne;
