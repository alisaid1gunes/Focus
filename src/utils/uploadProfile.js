const multer = require('multer');

const cloudinary = require('./cloudinary');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'DEV',
    transformation: [
      { gravity: 'face', height: 400, width: 400, crop: 'crop' },
      { radius: 'max' },
      { width: 200, crop: 'scale' },
    ],
    resource_type: "image",
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
module.exports = upload;
