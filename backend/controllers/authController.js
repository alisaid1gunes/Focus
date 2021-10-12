const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const RefreshToken = require('../models/RefreshToken');

const {
  registerValidation,
  loginValidation,
} = require('../validations/validations');

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('email already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    // eslint-disable-next-line no-underscore-dangle
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

const generateAccessToken = (id) => {
  return jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '60s',
  });
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('email or password is wrong');

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send('Invalid password');

  // eslint-disable-next-line no-underscore-dangle
  const accessToken = generateAccessToken(user._id);

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET
  );
  const refreshTokenDb = new RefreshToken({
    token: refreshToken,
  });
  const savedToken = await refreshTokenDb.save();
  res
    .header('auth-token', accessToken)
    .send({ accessToken: accessToken, refreshToken: refreshToken });
};
const logout = async (req, res) => {
  const refreshToken = req.body.refreshtoken;
  const payload = RefreshToken.deleteOne({ token: refreshToken });
  res.send('refreshtoken silindi');
};
const refresh = async (req, res) => {
  const refreshToken = await RefreshToken.findOne({
    token: req.body.refreshToken,
  });

  if (!refreshToken) return res.status(403);

  // eslint-disable-next-line camelcase
  jwt.verify(
    refreshToken.token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, userId) => {
      if (err) return console.log(err);
      const accessToken = generateAccessToken(userId);
      console.log(accessToken);
      return res.header('auth-token', accessToken).send({ accessToken });
    }
  );
};
module.exports = {
  register,
  login,
  refresh,
  logout,
};
