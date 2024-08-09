import { useState, useEffect } from "react";
import { getUser, updateUser } from "../../api/auth.api";
import style from "./Setting.module.css";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

function Setting() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let userId = localStorage.getItem("userId");

  if (userId.startsWith('"') && userId.endsWith('"')) {
    userId = JSON.parse(userId);
  }

  console.log(userId); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const user = await getUser(userId);
        if (user) {
          setUserData({
            name: user.name,
            email: user.email,
            password: "",
            confirmPassword: "",
          });
        }
      } else {
        alert("User ID not found. Please log in again.");
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await updateUser({
      userId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    if (response) {
      alert("User information updated successfully");
      navigate("/login"); 
    }
  };
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    navigate('/')
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
};

  return (
    <div className={style.setting}>
      <div className={style.logout} onClick={logout}>
      <HiOutlineLogout /> logout
        </div>
      <div className={style.settingleft}>
      <h1>Settings</h1>
      <form className={style.logindata} onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="name"
            type="text"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={userData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className={style.button}>
          Update
        </button>
        <h4>
          Already have an account? <Link to="/login">Login</Link>
        </h4>
      </form>
      </div>
    </div>
  );
}

export default Setting;
