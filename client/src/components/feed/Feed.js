import React, { useEffect } from 'react'
import CreatePost from '../CreatePost/CreatePost'
import Follower from '../followers/Follower'
import Myself from '../Myself/Myself'
import Post from '../post/Post'
import './Feed.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/FeedSlice'

function Feed() {

  const feedData = useSelector(state => state.feedSliceReducer.feedData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedData())
  }, [dispatch])

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
          {feedData?.posts?.map((post) => <Post key={post._id} post={post}/>)}
        </div>
        <div className="right-side">
          <h3 className="title">You are Following</h3>
          <div className="followers">
            {feedData?.followings?.map((user) => <Follower key={user._id} user={user} />)}
          </div>
          <div className="Suggestions">
          <h3 className="title">Your Suggestions</h3>
          {feedData?.Suggestions?.map((user) => <Follower key={user._id} user={user} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed