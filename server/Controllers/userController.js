const Post = require("../Models/Post");
const User = require("../Models/User");
const { mapPostOutput } = require("../utils/mapPostOutput");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

const followOrUnfollowController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const curUserId = req._id;
    if (curUserId === userIdToFollow) {
      return res.send(error(404, "One cannot follow themselves"));
    }

    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);

    if (!userToFollow) {
      return res.send(error(404, "User to follow not found"));
    }
    if (curUser.followings.includes(userIdToFollow)) {
      const followingIndex = await curUser.followings.indexOf(userIdToFollow);
      const followerIndex = await userToFollow.followers.indexOf(curUserId);
      curUser.followings.splice(followingIndex, 1);
      userToFollow.followers.splice(followerIndex, 1);
    } else {
      curUser.followings.push(userIdToFollow);
      userToFollow.followers.push(curUserId);
    }

    await curUser.save();
    await userToFollow.save();
    return res.send(success(200, {user: userToFollow}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getAllPostsController = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId).populate('followings');

    const fullPosts = await Post.find({
      owner: {
        $in: curUser.followings,
      },
    }).populate('owner');

    const posts = fullPosts.map((item) => mapPostOutput(item, req._id)).reverse();
    console.log(posts);

    const followingIds = curUser.followings.map(item => item._id);
    followingIds.push(req._id);
    const Suggestions = await User.find({
      _id: {
        $nin: followingIds
      },
    })

    return res.send(success(200, {...curUser._doc, Suggestions, posts}));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

// deleting an user means deleting it from their followers account ans then the user
const deleteMyProfileController = async (req, res) => {
  try {
    const curUserId = req._id;
    // const followings = curUser.followings;
    // for(let i = 0; i < followings.length;i++){
    //     let userId = followings[i].toString();
    //     let newUser = await User.findById(userId);
    //     let index = newUser.followers.indexOf(curUserId);
    //     newUser.followers.splice(index, 1);
    //     await newUser.save();
    // }
    // await curUser.remove();
    // res.send(success(200, "Success"))
    const curUser = await User.findById(curUserId);

    if (!curUser) {
      return res.send(error(404, "User not found"));
    }
    //delete all my posts
    await Post.deleteMany({
      owner: curUserId,
    });

    // remove myself from followings followers
    curUser.followings.forEach(async (followingId) => {
      const follower = await User.followers.findById(followingId);
      const index = await follower.followers.indexOf(followingId);
      follower.splice(index, 1);
      await follower.save();
    });

    // remove myself from followers followings
    curUser.followers.forEach(async (followerId) => {
      const following = await User.followings.findById(followerId);
      const index = await following.followings.indexOf(followerId);
      following.splice(index, 1);
      await following.save();
    });

    // remove likes from all posts
    const posts = await Post.find();
    posts.forEach(async (post) => {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
      await post.save();
    });

    await curUser.remove();

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "user deleted"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyInfoController = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    console.log(user);
    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateUserProfileController = async (req, res) => {
  try {
    const { name, bio, userImg } = req.body;

    const user = await User.findById(req._id);
    if (name) {
      user.name = name;
    }

    if (bio) {
      user.bio = bio;
    }

    if (userImg) {
      const cloudImg = await cloudinary.uploader.upload(userImg, {
        folder: "profileImg",
      });

      user.avatar = {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      };
    }
    await user.save();
    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserProfileController = async (req, res) => {
  try {
      const userId = req.body.userId;
      const user = await User.findById(userId).populate({
          path: "posts",
          populate: {
              path: "owner",
          },
      });

      if(!user.posts){
        return res.send(success(200, {user}))
      }
      const fullPosts = user.posts;
      const posts = fullPosts
          .map((item) => mapPostOutput(item, req._id))
          .reverse();

      return res.send(success(200, { ...user._doc, posts }));
  } catch (e) {
      console.log('error put', e);
      return res.send(error(500, e.message));
  }
};

module.exports = {
  followOrUnfollowController,
  getAllPostsController,
  deleteMyProfileController,
  getMyInfoController,
  updateUserProfileController,
  getUserProfileController
};
