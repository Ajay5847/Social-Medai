import React from "react";
import { useNavigate } from "react-router";
import userImg from "../../assets/user.png";
import Post from "../post/Post";
import "./Profile.scss";

function Profile() {

  const navigate = useNavigate();

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-side">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="right-side">
          <div className="profile-card">
            <div className="avatar">
              <img src={userImg} alt="" className="user-image" />
            </div>
            <h2 className="username">M Ajay Kumar</h2>
            <p className="bio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quod
              aperiam illum saepe amet facilis corrupti dolor officiis maxime
              voluptas!
            </p>
            <div className="follower-info">
              <h3>40 Followers</h3>
              <h3>48 Followings</h3>
            </div>
            <button className="btn-primary follow">Follow</button>
            <button className="btn-secondary update" onClick={() => navigate('/updateprofile')}>Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
