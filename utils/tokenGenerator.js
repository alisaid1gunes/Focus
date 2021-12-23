const jwt = require('jsonwebtoken');

const generateToken = (id, secret, duration) =>
  jwt.sign({ _id: id }, secret, {
    expiresIn: duration,
  });
module.exports.generateToken = generateToken;
