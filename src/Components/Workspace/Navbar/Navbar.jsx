import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const URL = "http://localhost:8080";

function Navbar() {
  const [fromName, setFromName] = useState("");

  const handleSubmit = async () => {
    try {
      const work = await axios.post(`${URL}/api/v1/work/createname`, {
        name: fromName,
      });
      if (work.data.success) {
        toast.success(work.data.message);
      } else {
        toast.error(work.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className={styles.navbar}>
        <input
          type="text"
          placeholder="Enter Form Name"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          className={styles.input}
        />
        <div className={styles["navbar-center"]}>
          <Link to="/workspace/flow">Flow</Link>
          <Link to="/workspace/theme">Theme</Link>
          <Link to="/workspace/response">Response</Link>
        </div>
        <div className={styles["navbar-end"]}>
          <span className={styles.share}>Share</span>
          <span className={styles.save} onClick={handleSubmit}>
            Save
          </span>
          <Link to="/workspace">
            <span>
              <RxCross1 style={{ color: "red" }} />
            </span>
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Navbar;
