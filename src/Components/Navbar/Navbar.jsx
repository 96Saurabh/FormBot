import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";

function Navbar({ fromName, setFromName, handleSave }) {
  const [inputValue, setInputValue] = useState(fromName);

  const onSaveClick = () => {
    // Call the handleSave function passed as a prop
    handleSave({ fromName: inputValue });
  };

  return (
    <div>
      <div className={styles.navbar}>
        <input
          type="text"
          placeholder="Enter Form Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
        />
        <div className={styles["navbar-center"]}>
          <Link to="/workspace/flow">Flow</Link>
          <Link to="/workspace/theme">Theme</Link>
          <Link to="/workspace/response">Response</Link>
        </div>
        <div className={styles["navbar-end"]}>
          <span className={styles.share}>Share</span>
          <span className={styles.save} onClick={onSaveClick}>
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
