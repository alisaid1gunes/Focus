const router = require('express').Router();

const userController = require('../controllers/user');

const verify = require('../middlewares/verifyToken');

const upload = require('../utils/uploadProfile');

router.get('/profile', verify, userController.getProfilePic);

router.get('/:id', verify, userController.get);

router.delete('/:id', verify, userController.remove);

router.put('/:id', verify, upload.single('profile'), userController.update);

module.exports = router;
