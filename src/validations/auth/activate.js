const Joi = require('joi-oid');

const activate = (data) => {
  const activateSchema = Joi.object({
    id: Joi.objectId().required(),
    activationCode: Joi.number().required(),
  });

  return activateSchema.validate(data);
};

module.exports = activate;
