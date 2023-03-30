import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
// import userImg from "../../assets/user.png";
import { getUserProfile } from "../../redux/slices/postSlice";
import Post from "../post/Post";
import "./Profile.scss";

function Profile() {
  const userProfile = useSelector(
    (state) => state.postSliceReducer.userProfile
  );
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);
  }, [params.userId]);

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-side">
        {userProfile?.posts?.map((post) => <Post key={post._id} post={post} />)}
        </div>
        <div className="right-side">
          <div className="profile-card">
            <div className="avatar">
              <img
                src={userProfile?.avatar?.url}
                alt="userProfile"
                className="user-image"
              />
            </div>
            <h2 className="username">{userProfile?.name}</h2>
            <p className="bio">{userProfile?.bio}</p>
            <div className="follower-info">
              <h3>{userProfile?.followers?.length} Followers</h3>
              <h3>{userProfile?.followings?.length} Followings</h3>
            </div>
            {!isMyProfile && (
              <button className="btn-primary follow">Follow</button>
            )}
            {isMyProfile && (
              <button
                className="btn-secondary update"
                onClick={() => navigate("/updateprofile")}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
