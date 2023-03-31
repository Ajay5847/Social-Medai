import React from 'react'
import userImg from '../../assets/user.png'
import './Myself.scss'
import { useSelector } from 'react-redux';

function Myself() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  return (
    <div className='myself'>
        <div className="container">
            <div className="avatar">
                <img src={myProfile?.avatar?.url || userImg} alt="" />
            </div>
            <h2 className="username">{myProfile?.name}</h2>
            <p className="info">{myProfile?.followers?.length} Followers | {myProfile?.followings?.length} Followings</p>
            <p className='bio'>{myProfile?.bio}</p>
        </div>
    </div>
  )
}

export default Myself