const authController = require('../Controllers/authController');

const router = require('express').Router();

router.post('/signup', authController.signUpController);
router.post('/login', authController.loginController)
router.post('/refresh', authController.refreshAccessTokenController)
router.post('/logout', authController.logoutController)

module.exports = router;