import React from "react";
import Avatar from "../avatar/Avatar";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import backgroundImg from "../../assets/background.jpg";
import { useDispatch } from 'react-redux'
import "./Post.scss";
import { likeAndUnlike } from "../../redux/slices/postSlice";

function Post({post}) {

  const dispatch = useDispatch();

  async function handleLike() {
    dispatch(likeAndUnlike({
      postId: post._id
    }))
  }

  return (
    <div className="post">
      <div className="heading">
        <Avatar src={post?.owner?.avatar.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={handleLike}>
          {post.isLiked ? <AiFillHeart style={{color: 'red'}} className="icon"/> : <AiOutlineHeart className="icon" />}
          <h4>{post?.likesCount} Likes</h4>
        </div>
        <p className="caption">{post?.caption}</p>
        <h6 className="time-ago">4 hours ago</h6>
      </div>
    </div>
  );
}

export default Post;
