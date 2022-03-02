const Joi = require('joi-oid');

const getOne = (data) => Joi.objectId().required().validate(data);

module.exports = getOne;
