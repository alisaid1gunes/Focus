const router = require('express').Router();

const verify = require('./verifyToken');

const User = require('../models/User');

const {
  taskValidationSave,
  taskValidationDelete,
  taskValidationGet,
} = require('../controllers/validations');
router.get('/', verify, async (req, res) => {
  const { error } = taskValidationGet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.user_id });
  res.send(user.tasks);
});
router.post('/save', verify, async (req, res) => {
  const { error } = taskValidationSave(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.user_id });
  user.tasks.push({
    name: req.body.name,
    done: req.body.done,
  });
  const savedUser = await user.save();
  res.send({ savedUser });
});
router.delete('/delete', verify, async (req, res) => {
  const { error } = taskValidationDelete(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.user_id });

  user.tasks.pull({ _id: req.body.task_id });

  user.save();

  res.send({ user });
});

router.put('/update', verify, async (req, res) => {
  
});

module.exports = router;
