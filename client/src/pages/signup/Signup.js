import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleSubmit(e){
    e.preventDefault();

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

          <input type="submit" className="submit" value="Submit" />
        </form>
        <p>
          Already have an account<Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
