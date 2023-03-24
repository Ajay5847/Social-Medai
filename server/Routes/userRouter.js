const requiredUser = require('../Middlewres/requiredUser');
const userController = require('../Controllers/userController');
const router = require('express').Router();

router.post('/follow', requiredUser, userController.followOrUnfollowController);
router.get('/followingposts', requiredUser, userController.getAllPostsController);
router.delete('/delete', requiredUser, userController.deleteMyProfileController);

module.exports = router;