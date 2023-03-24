import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../../components/NavBar/NavBar'

function Home() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Home
