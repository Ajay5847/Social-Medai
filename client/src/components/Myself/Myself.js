import React from 'react'
import userImg from '../../assets/user.png'
import './Myself.scss'

function Myself() {
  return (
    <div className='myself'>
        <div className="container">
            <div className="avatar">
                <img src={userImg} alt="" />
            </div>
            <h2 className="username">M Ajay Kumar</h2>
            <p className="info">40 Followers | 38 Followings</p>
            <p className='bio'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, nesciunt?</p>
        </div>
    </div>
  )
}

export default Myself