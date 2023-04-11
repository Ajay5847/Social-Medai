import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import "./NavBar.scss";
import { useSelector } from "react-redux";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorage";
import { axiosClient } from "../../utils/axiosClient";

function NavBar() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      console.log("error",e)
    }
  }
  return (
    <div className="NavBar">
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          PicBuzz
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogout}>
            <HiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
