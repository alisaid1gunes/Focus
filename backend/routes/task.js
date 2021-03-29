const router = require('express').Router();

const verify = require('./verifyToken');

const User = require('../models/User');

const { taskValidation } = require('../controllers/validations');

router.post('/save', verify, (req, res) => {
  const { error } = taskValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  

});

module.exports = router;
