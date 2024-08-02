import style from "./Setting.module.css";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Setting() {
  return (
    <div>
      <h1>Settings</h1>

      <form className={style.logindata} 
      // onSubmit={handleSubmit}
      >
        <div>
          <label>Username</label>
          <input
            name="name"
            // onChange={handleChange}
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            // onChange={handleChange}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            // onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            // onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className={style.button}>
          Register Now
        </button>
        <h4>
          Already have an account? <Link to="/login">Login</Link>
        </h4>
      </form>
    </div>
  );
}

export default Setting;
