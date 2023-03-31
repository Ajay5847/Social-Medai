import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
// import userImg from "../../assets/user.png";
import { getUserProfile } from "../../redux/slices/postSlice";
import Post from "../post/Post";
import "./Profile.scss";
import { followAndUnFollow } from "../../redux/slices/FeedSlice";

function Profile() {
  const userProfile = useSelector(
    (state) => state.postSliceReducer.userProfile
  );
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  const params = useParams();
  const feedData = useSelector((state) => state.feedSliceReducer.feedData);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [feedData, params.userId, feedData]);

  function handleFollowAndUnFollow() {
    dispatch(followAndUnFollow({
      userIdToFollow: params.userId
    }))
  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-side">
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
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
              <h5
                onClick={handleFollowAndUnFollow}
                className={
                  isFollowing ? "hover-link follow-link" : "btn-primary"
                }
              >
                {isFollowing ? "UnFollow" : "Follow"}
              </h5>
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
