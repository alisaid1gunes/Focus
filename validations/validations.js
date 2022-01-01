const Joi = require('joi-oid');

const registerValidation = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(10).required(),
  });
  return userSchema.validate(data);
};

const loginValidation = (data) => {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(10).required(),
  });
  return loginSchema.validate(data);
};

const taskValidationSave = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(1).max(25).required(),
    done: Joi.boolean().required(),
  });

  return taskSchema.validate(data);
};
const taskValidationUpdate = (data) => {
  const taskSchema = Joi.object({
    name: Joi.string().min(1).max(25),
    userId: Joi.objectId(),
    done: Joi.boolean(),
  });

  return taskSchema.validate(data);
};
const taskValidationDelete = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
    taskId: Joi.objectId().required(),
  });

  return taskSchema.validate(data);
};
const taskValidationGet = (data) => {
  const taskSchema = Joi.object({
    userId: Joi.objectId().required(),
  });

  return taskSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.taskValidationSave = taskValidationSave;
module.exports.taskValidationDelete = taskValidationDelete;
module.exports.taskValidationGet = taskValidationGet;
module.exports.taskValidationUpdate = taskValidationUpdate;
