import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import userImg from "../../assets/user.png";
import { getUserProfile } from "../../redux/slices/postSlice";
import Post from "../post/Post";
import "./Profile.scss";

function Profile() {

  const userProfile = useSelector(state => state.postSliceReducer.userProfile);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(params.userId));
  }, [])

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
              <img src={userProfile?.avatar?.url} alt="" className="user-image" />
            </div>
            <h2 className="username">{userProfile?.name}</h2>
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
