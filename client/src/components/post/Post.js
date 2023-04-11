import React from "react";
import Avatar from "../avatar/Avatar";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import backgroundImg from "../../assets/background.jpg";
import { useDispatch } from 'react-redux'
import "./Post.scss";
import { likeAndUnlike } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";

function Post({post}) {

  const navigate =useNavigate();
  const dispatch = useDispatch();

  async function handleLike() {
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: post?.isLiked ? "DisLiked" : "Liked"
    }))
    dispatch(likeAndUnlike({
      postId: post._id
    }));
  }

  return (
    <div className="post">
      <div className="heading" onClick={() => navigate(`/profile/${post.owner._id}`)}>
        <Avatar src={post?.owner?.avatar.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={handleLike}>
          {post?.isLiked ? <AiFillHeart style={{color: 'red'}} className="icon"/> : <AiOutlineHeart className="icon" />}
          <h4>{post?.likesCount} Likes</h4>
        </div>
        <p className="caption">{post?.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
