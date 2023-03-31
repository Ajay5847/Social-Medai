const requiredUser = require('../Middlewres/requiredUser');
const userController = require('../Controllers/userController');
const router = require('express').Router();

router.post('/follow', requiredUser, userController.followOrUnfollowController);
router.get('/getFeedData', requiredUser, userController.getAllPostsController);
router.delete('/delete', requiredUser, userController.deleteMyProfileController);
router.get('/getMyInfo', requiredUser, userController.getMyInfoController);
router.put('/', requiredUser, userController.updateUserProfileController);
router.post('/getUserProfile', requiredUser, userController.getUserProfileController);

module.exports = router;