import React, { useState, useEffect } from "react";
import "./UpdateProfile.scss";
import backgroundImg from '../../assets/background.jpg';
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(myProfile?.name || '');
    setBio(myProfile?.bio || '');
    setUserImg(myProfile?.avatar?.url || '');
  }, [myProfile]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateMyProfile({
        name,
        bio,
        userImg
    }))
    
  }

  return (
    <div className="update-profile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="user-img" className="labelImg">
              <img src={userImg ? userImg : backgroundImg} alt={name} />
            </label>
            <input
              type="file"
              accept="image/*"
              id="user-img"
              className="inputImg"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Want to Update Your Name</label>
            <input
              value={name}
              type="text"
              placeholder="Your Name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="bio">Update Bio</label>
            <input
              value={bio}
              type="text"
              placeholder="Your Bio"
              id="bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="submitbutton">
              <button className="submit btn-secondary" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
          <div className="deletebutton">
            <button className="delete btn-primary">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
