import React from "react";
import Avatar from "../avatar/Avatar";
import { AiOutlineHeart } from "react-icons/ai";
import backgroundImg from "../../assets/background.jpg";
import "./Post.scss";

function Post() {
  return (
    <div className="post">
      <div className="heading">
        <Avatar />
        <h4>Ajay Kumar</h4>
      </div>
      <div className="content">
        <img src={backgroundImg} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <AiOutlineHeart className="icon" />
          <h4>5 Likes</h4>
        </div>
        <p className="caption">This is Nature</p>
        <h6 className="time-ago">4 hours ago</h6>
      </div>
    </div>
  );
}

export default Post;
