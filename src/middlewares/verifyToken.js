const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../config/config.js');
module.exports = function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('access denied');

  try {
    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = verified._id;
    next();
  } catch (err) {
    return res.status(400).send('invalid token');
  }
};
