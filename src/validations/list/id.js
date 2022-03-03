const Joi = require('joi-oid');

const id = (data) => Joi.objectId().required().validate(data);

module.exports = id;
