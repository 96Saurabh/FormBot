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
import leftside from "./images/leftside.png";
import rightside from "./images/rightside.png";

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
        <div className={style.leftimg}>
          <img
            src={leftside}
            alt="header"
            style={{ height: "150px", width: "150px" }}
          />
        </div>
        <div className={style.centertitle}>
          <h1>Build advanced chatbots</h1>
          <h1>visually</h1>
          <h3>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </h3>
          <Link to="/register">
            <div className={style.create}>Create a FormBot for free</div>
          </Link>
        </div>
        <div className={style.rightimg}>
          <img
            src={rightside}
            alt="header"
            style={{ height: "150px", width: "200px" }}
          />
        </div>
      </div>
      <div className={style.header}>
        <img
          src={headerImg}
          alt="header"
          style={{ height: "630px", width: "1130px" }}
        />
      </div>
      <div className={style.info}>
        <div className={style.details}>
          <h2>Replace your old school forms </h2>
          <h2>with</h2>
          <h2>chatbots</h2>

          <h3>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </h3>
        </div>
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
          <h3>Integrate with any platform</h3>

          <h4>
            Typebot offers several native integrations blocks as well as
            instructions on
          </h4>
          <h4>how to embed typebot on particular platforms</h4>
        </div>
        <div>
          <div className={style.details}>
            <h2>Collect results in real-time</h2>

            <h3>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </h3>
          </div>
        </div>
        <div className={style.header}>
          <img
            src={chat}
            alt="header"
            style={{
              marginLeft: "250px",
              height: "530px",
              width: "630px",
            }}
          />
        </div>
        <div>
          <div className={style.details}>
            <h3>And many more features</h3>

            <h4>
              Typebot makes form building easy and comes with powerful features.
            </h4>
          </div>
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
        <div className={style.bottompage}>
        <div className={style.title}>
        <div className={style.leftimg}>
          <img
            src={leftside}
            alt="header"
            style={{ height: "150px", width: "150px" }}
          />
        </div>
        <div className={style.centertitle}>
          <h1>Build advanced chatbots</h1>
          <h1>visually</h1>
          
          <Link to="/register">
            <div className={style.create}>Create a FormBot</div>
          </Link>
          <h4>No trial. Generous free plan.</h4>
        </div>
        <div className={style.rightimg}>
          <img
            src={rightside}
            alt="header"
            style={{ height: "150px", width: "150px" }}
          />
        </div>
      </div>
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
