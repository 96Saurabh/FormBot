import { useState } from "react";
import style from "./Theme.module.css";
import image1 from "./image/image1.png";
import image2 from "./image/image2.png";
import image3 from "./image/image3.png";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

function Theme() {
  const [color, setColor] = useState("#FFFFFF");
  const textColor = color === "#FFFFFF" ? "rgba(23, 25, 35, 1)" : "#FFFFFF";

  return (
    <div>
       <div className={style.navbar}>
       
        <div className={style["navbar-center"]}>
          <Link to="/FormPage">Flow</Link>
          <Link to="/workspace/theme">Theme</Link>
          <Link to="/workspace/response">Response</Link>
        </div>
        <div className={style["navbar-end"]}>
          <span className={style.share} >
            Share
          </span>
          <span className={style.save}>
            Save
          </span>
          <Link to="/workspace">
            <span>
              <RxCross1 style={{ color: "red" }} />
            </span>
          </Link>
        </div>
      </div>
      <div className={style.themecontanier}>
        <div className={style.themediv}>
          <div className={style.title}>
            <h4>Customize the theme</h4>
          </div>
          <hr />

          <div className={style.theme}>
            <img
              src={image1}
              alt="Light"
              width={200}
              height={100}
              onClick={() => {
                setColor("#FFFFFF");
              }}
              style={{ backgroundColor: "#FFFFFF" }}
            />
          </div>
          <div className={style.theme}>
            <img
              src={image2}
              alt="Dark"
              width={200}
              height={100}
              onClick={() => {
                setColor("rgba(23, 25, 35, 1)");
              }}
              style={{ backgroundColor: "rgba(23, 25, 35, 1)" }}
            />
          </div>
          <div className={style.theme}>
            <img
              src={image3}
              alt=""
              width={200}
              height={100}
              onClick={() => {
                setColor("rgba(80, 140, 155, 1)");
              }}
              style={{ backgroundColor: "rgba(80, 140, 155, 1)" }}
            />
          </div>
        </div>
        <div
          className={style.colordiv}
          style={{ backgroundColor: color, color: textColor }}
        >
          <div className={style.color}>
            <div className={style.formbotleft}>
              <div className={style.formbotbubboles}>saurabh</div>
            </div>

            <div className={style.formbotright}>
              <div className={style.formbotbubboles}>nirmale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme;
