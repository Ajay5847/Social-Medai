import React from 'react'
import CreatePost from '../CreatePost/CreatePost'
import Follower from '../followers/Follower'
import Myself from '../Myself/Myself'
import Post from '../post/Post'
import './Feed.scss'

function Feed() {
  return (
    <div className='feed'>
      <div className="container">
        <div className="aside">
          <Myself />
        </div>
        <div className="left-side">
          <div className="create-post">
          <CreatePost />
          </div>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="right-side">
          <h3 className="title">You are Following</h3>
          <div className="followers">
            <Follower />
            <Follower />
            <Follower />
            <Follower />
          </div>
          <div className="Suggestions">
          <h3 className="title">Your Suggestions</h3>
            <Follower />
            <Follower />
            <Follower />
            <Follower />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed