import style from "./Home.module.css";
import { Link } from "react-router-dom";
import headerImg from "./images/header.png";
import logo from "./images/logo.png";
import info from "./images/info.png";
import left from "./images/left.png";
import right from "./images/right.png";
import image from "./images/image.png";
import chat from "./images/chat.png";
import other from "./images/other.png";
import bottom from "./images/bottom.png";
import footer from "./images/footer.png";

function Home() {
  return (
    <div>
      <div className={style.navbar}>
        <div className={style.logo}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "30px", width: "30px" }}
          />
          FromBot
        </div>
        <Link to="/login">
          <div className={style.signin}>Sign in</div>
        </Link>
        <Link to="/register">
          <div className={style.create}>Create a FormBot</div>
        </Link>
      </div>
      <div className={style.title}>
        <div className={style.leftimg}>left</div>
        <div className={style.centertitle}>
          <h1>Build advanced chatbots</h1>
          <h1>visually</h1>
          <h3>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </h3>
          <div className={style.create}>Create a FormBot for free</div>
        </div>
        <div className={style.rightimg}>rihght</div>
      </div>
      <div className={style.header}>
        <img
          src={headerImg}
          alt="header"
          style={{ height: "630px", width: "1130px" }}
        />
      </div>
      <div className={style.info}>
        <span>Build advanced chatbots</span>
        
        <h3>
          Typebot gives you powerful blocks to create unique chat experiences.
          Embed them anywhere on your web/mobile apps and start collecting
          results like magic.
        </h3>
        
        <div className={style.header}>
        <img
          src={info}
          alt="header"
          style={{ height: "630px", width: "1130px" }}
        />
      </div>
      <div className={style.header}>
        <img
          src={left}
          alt="header"
          style={{ height: "430px", width: "1130px" }}
        />
      </div>
      <div className={style.header}>
        <img
          src={right}
          alt="header"
          style={{ height: "430px", width: "1130px" }}
        />
      </div>
      <div className={style.header}>
        <img
          src={image}
          alt="header"
          style={{ height: "230px", width: "1130px" }}
        />
        <span>Build advanced chatbots</span>
        
        <h3>
          Typebot gives you powerful blocks to create unique chat experiences.
          Embed them anywhere on your web/mobile apps and start collecting
          results like magic.
        </h3>
      </div>
      <div>
      <span>Build advanced chatbots</span>
        
        <h3>
          Typebot gives you powerful blocks to create unique chat experiences.
          Embed them anywhere on your web/mobile apps and start collecting
          results like magic.
        </h3>
      </div>
      <div className={style.header}>
        <img
          src={chat}
          alt="header"
          style={{ 
            marginLeft:"250px",
            height: "530px", width: "630px" }}
        />
      </div>
      <div>
      <span>Build advanced chatbots</span>
        
        <h3>
          Typebot gives you powerful blocks to create unique chat experiences.
          Embed them anywhere on your web/mobile apps and start collecting
          results like magic.
        </h3>
      </div>
      <div className={style.header}>
        <img
          src={other}
          alt="header"
          
           style={{ height: "430px", width: "1130px" }}
        />
      </div>
      <div className={style.header}>
        <img
          src={bottom}
          alt="header"
          
           style={{ height: "230px", width: "1200px" }}
        />
      </div>
      <div className={style.header}>
        <img
          src={footer}
          alt="header"
          
           style={{ height: "230px", width: "1130px" }}
        />
      </div>
      </div>
    </div>
  );
}

export default Home;
