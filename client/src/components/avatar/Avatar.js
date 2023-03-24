import React from 'react'
import userImg from '../../assets/user.png'
import './Avatar.scss'

function Avatar() {
  return (
    <div className='Avatar'>
        <img src={userImg} alt="" />
    </div>
  )
}

export default Avatar