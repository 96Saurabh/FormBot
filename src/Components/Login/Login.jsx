import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { loginUser } from "../../api/auth.api";

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
    <div className={style.container}>
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
          Don't have an account? <Link to="/register">Register Now</Link>
        </h4>
      </form>
    </div>
  );
}

export default Login;
