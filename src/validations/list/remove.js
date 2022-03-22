const Joi = require('joi-oid');

const remove = (data) => Joi.objectId().required().validate(data);

module.exports = remove;
