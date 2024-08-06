import { Link } from "react-router-dom";
import style from "./Response.module.css";
import { RxCross1 } from "react-icons/rx";

function Response() {
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
      <div className={style.container}>
        <div className={style.headerinfo}>
          <div className={style.header}>
            <h4>Header</h4>
            <h4>1</h4>
          </div>
          <div className={style.header}>Start</div>
          <div className={style.header}>Compliation rate</div>
        </div>
        <div className={style.responsedata}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Form Name</th>
                  <th>Submitted At</th>
                  <th>lable</th>
                  
                </tr>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>value</td>
                  
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h1 className={style.emptydata}> No responce is avalible</h1>
    </div>
  );
}

export default Response;
