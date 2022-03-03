const Joi = require('joi-oid');

const get = (data) => Joi.objectId().required().validate(data);
module.exports = get;
