const router = require('express').Router();
const postsController = require('../Controllers/postsController');
const requiredUser = require('../Middlewres/requiredUser');

router.post('/', requiredUser, postsController.createPostController);
router.post('/like', requiredUser, postsController.likeAndUnlikeController);
router.put('/', requiredUser, postsController.updatePostController);
router.delete('/', requiredUser, postsController.deletePostController);
router.get('/myposts', requiredUser, postsController.getMyPostsController);
router.post('/userposts', requiredUser, postsController.getUserPostsController);

module.exports = router