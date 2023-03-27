import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import NavBar from '../../components/NavBar/NavBar'
import { getMyInfo } from '../../redux/slices/appConfigSlice';

function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Home
