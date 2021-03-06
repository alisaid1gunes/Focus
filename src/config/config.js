const dotenv = require('dotenv');

dotenv.config();

const env = {
  DB_CONNECT: process.env.DB_CONNECT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  VERIFIED_SENDER: process.env.VERIFIED_SENDER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  PORT: process.env.PORT,
  REDIS_HOST: process.env.REDIS_HOST||'redis://localhost:6379',
};

module.exports = env;
