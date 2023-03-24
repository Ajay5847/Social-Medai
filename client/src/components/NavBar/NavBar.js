import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Avatar from "../avatar/Avatar";
import { HiOutlineLogout } from'react-icons/hi'
import LoadingBar from 'react-top-loading-bar'
import "./NavBar.scss";

function NavBar() {

  const navigate = useNavigate();
  const loadingBar = useRef(null);

  const [loading, setLoading] = useState(false);

  function toggelLoadingBar() {
    if(loading){
      setLoading(false);
      loadingBar.current.complete();
    }
    else{
      setLoading(true);
      loadingBar.current.continuousStart();
    }
  }

  return (
    <div className="NavBar">
      <LoadingBar color='#f11946' ref={loadingBar} />
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate('/')}>Social Media</h2>
        <div className="right-side">
          <div className="profile hover-link" onClick={() => navigate('/profile/ajay')}>
            <Avatar />
          </div>
          <div className="logout hover-link"onClick={toggelLoadingBar}>
            <HiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
