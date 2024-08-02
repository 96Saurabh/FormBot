import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { loginUser } from "../../api/auth.api";
import loginleft from "./images/loginleft.png";
import loginbottom from "./images/loginbottom.png";
import loginright from "./images/loginright.png";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    const result = await loginUser(formData);
    if (result) {
      navigate("/workspace");
    }
  };

  return (
    <>
    <div className={style.container}>
      <div className={style.leftimg}>
        <img
          src={loginleft}
          alt="header"
          style={{ height: "150px", width: "150px" }}
        />
      </div>
      <form className={style.logindata} onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className={style.button}>
          Sign in
        </button>
        <h4>
          Dont have an account? <Link to="/register">Register Now</Link>
        </h4>
      </form>
      <div className={style.rightside}>
        <img
          src={loginright}
          alt="header"
          style={{ height: "250px", width: "150px" }}
        />
      </div>
    </div>
    <div className={style.bottom}>
    <img
          src={loginbottom}
          alt="header"
          style={{ height: "150px", width: "250px" }}
        />
    </div>
    </>
  );
}

export default Login;
