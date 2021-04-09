const router = require('express').Router();

const verify = require('./verifyToken');

const User = require('../models/User');

const {
  taskValidationSave,
  taskValidationDelete,
  taskValidationGet,
  taskValidationUpdate,
} = require('../controllers/validations');
router.get('/', verify, async (req, res) => {
  const { error } = taskValidationGet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.user_id });
  res.json(user.tasks);
});
router.post('/', verify, async (req, res) => {
  const { error } = taskValidationSave(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.user_id });
  user.tasks.push({
    name: req.body.name,
    done: req.body.done,
  });
  const savedUser = await user.save();
  res.json({ savedUser });
});
router.delete('/', verify, async (req, res) => {
  const { error } = taskValidationDelete(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.user_id });

  user.tasks.pull({ _id: req.body.task_id });

  user.save();

  res.json({ user });
});

router.put('/', verify, async (req, res) => {
  const { error } = taskValidationUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.user_id });
  // eslint-disable-next-line no-underscore-dangle
  const index = user.tasks.findIndex((obj) => obj._id == req.body.task_id);
  user.tasks[index].done = req.body.done;
  const savedUser = await user.save();
  res.json({ savedUser });
});

module.exports = router;
