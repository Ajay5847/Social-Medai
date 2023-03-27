import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
// import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import RequiredUser from "./pages/RequiredUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/updateprofile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

function App() {

  const isLoading = useSelector(state => state.appConfigReducer.isLoading);
  const loadingBar = useRef(null);
   useEffect(() => {
    if(isLoading){
      loadingBar?.current?.continuousStart();
    }else{
      loadingBar?.current?.complete();
    }
   }, [isLoading])

  return (
    <div>
      <LoadingBar color='#f11946' ref={loadingBar} />
      <Routes>
        <Route element={<RequiredUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </div>
  );
}

export default App;