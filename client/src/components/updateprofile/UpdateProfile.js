import React from 'react'
import userImg from '../../assets/user.png'
import './UpdateProfile.scss'

function UpdateProfile() {
  return (
    <div className='update-profile'>
        <div className="container">
            <div className="left-part">
                <img src={userImg} alt="" className="userImg" />
            </div>
            <div className="right-part">
                <form>
                    <label htmlFor="name">Want to Update Your Name</label>
                    <input type="text" placeholder='Your Name' id='name'/>
                    <label htmlFor="bio">Update Bio</label>
                    <input type="text" placeholder='Your Bio' id='bio'/>
                    <div className="submitbutton">
                    <button className='submit btn-secondary'>Submit</button>
                    </div>
                </form>
                <div className="deletebutton">
                    <button className='delete btn-primary'>Delete Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile