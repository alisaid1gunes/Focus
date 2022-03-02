const Joi = require('joi-oid');

const getAll = (data) => Joi.objectId().required().validate(data);

module.exports = getAll;
