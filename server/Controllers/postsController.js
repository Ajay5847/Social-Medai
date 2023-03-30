const Post = require("../Models/Post");
const User = require("../Models/User");
const { mapPostOutput } = require("../utils/mapPostOutput");
const cloudinary = require('cloudinary').v2;
const { success, error } = require("../utils/responseWrapper");

const createPostController = async (req, res) => {
  try {
    const { caption, postImg } = req.body;

    if(!caption && !postImg) {
      return res.send(error(400,"Caption and PostImage are required"));
    }
    const owner = req._id;

    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postImg"
    });

    const user = await User.findById(owner);
    const post = await Post.create({
      owner,
      caption,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url
      }
    });

    user.posts.push(post);
    await user.save();

    return res.send(success(201, post));
  } catch (e) {
    res.send(error(401, e.message));
  }
};

const likeAndUnlikeController = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId).populate('owner');

    if (!post) {
      return res.send(error(401, "Post not found"));
    }

    if (post.likes.includes(curUserId)) {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
    } else {
      post.likes.push(curUserId);
    }

    await post.save();
    return res.send(success(200, {post: mapPostOutput(post, req._id)}));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.send(error(404, "Post not Found"));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(401, "Only owners can update their posts"));
    }

    post.caption = caption;
    await post.save();

    return res.send(success(200, post));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "Post not Found"));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(401, "Only owners can delete their posts"));
    }

    const curUser = await User.findById(curUserId);
    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1);
    await curUser.save();
    await post.remove();

    res.send(success(200, "Post deleted Successfully"));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const getMyPostsController = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);
    const myPosts = await Post.find({
      'owner': curUserId
    }).populate('likes');

    if (!curUser) {
      return res.send(error(404, "User not found to display posts"));
    }

    return res.send(success(200, {myPosts}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserPostsController = async (req, res) => {
  try {
    const { userId } = req.body;

    if(!userId) {
      return res.send(error(400, "UserId is required"));
    }

    const userPosts = await Post.find({
      'owner': userId
    }).populate('likes') // populate is used to display objects of likes field

    res.send(success(200, {userPosts}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  createPostController,
  likeAndUnlikeController,
  updatePostController,
  deletePostController,
  getMyPostsController,
  getUserPostsController,
};
