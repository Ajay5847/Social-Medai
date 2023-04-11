import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { useDispatch } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
          name,
          email,
          password,
      });
      navigate('/login')
  } catch (error) {
      console.log(error);
  }
  }

  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="subheading">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="email"
            id="email"
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" onClick={handleSubmit} className="submit" value="Submit" />
        </form>
        <p>
          Already have an account<Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
