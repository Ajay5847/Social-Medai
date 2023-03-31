import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnFollow } from "../../redux/slices/FeedSlice";
import { useNavigate } from "react-router";


function Follower({user}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector(state => state.feedSliceReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);

  function handleFollowAndUnFollow() {
    dispatch(followAndUnFollow({
      userIdToFollow: user._id
    }))
  }

  return (
    <div className="Follower">
      <div className="user-info" onClick={() => navigate(`/profile/${user._id}`)}>
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>
      <h5 onClick={handleFollowAndUnFollow} className = {isFollowing ? "hover-link follow-link" : "btn-primary"}>{isFollowing ? "UnFollow" : "Follow"}</h5>
    </div>
  );
}

export default Follower;
