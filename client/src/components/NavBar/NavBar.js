import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Avatar from "../avatar/Avatar";
import { HiOutlineLogout } from'react-icons/hi'
import "./NavBar.scss";
import {  useSelector } from "react-redux";


function NavBar() {

  const myProfile = useSelector(state => state.appConfigReducer.myProfile);
  const navigate = useNavigate();

  return (
    <div className="NavBar">
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate('/')}>Social Media</h2>
        <div className="right-side">
          <div className="profile hover-link" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link">
            <HiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
