import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import { Link } from "react-router-dom";
import loginleft from "./images/loginleft.png";
import loginbottom from "./images/loginbottom.png";
import loginright from "./images/loginright.png";
import { registerUser } from "../../api/auth.api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password,  } = formData;

    if (!name || !email || !password ) {
      alert("Fields can't be empty");
      return;
    }

    try {
      const result = await registerUser(formData);
      if (result) {
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.leftimg}>
          <img src={loginleft} alt="header" style={{ height: "150px", width: "150px" }} />
        </div>
        <form className={style.logindata} onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              onChange={handleChange}
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
        <div className={style.rightside}>
          <img src={loginright} alt="header" style={{ height: "250px", width: "150px" }} />
        </div>
      </div>
      <div className={style.bottom}>
        <img src={loginbottom} alt="header" style={{ height: "150px", width: "250px" }} />
      </div>
    </div>
  );
}

export default Register;
