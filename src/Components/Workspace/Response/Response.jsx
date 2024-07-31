import React from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Response.module.css";

function Response() {
  return (
    <div>
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
                  <th>Submitted Date</th>
                  <th>Contact</th>
                  <th>Country</th>
                  <th>Country</th>
                  <th>Country</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                  <td>Germany</td>
                  <td>Germany</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                  <td>Mexico</td>
                  <td>Mexico</td>
                  <td>Mexico</td>
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
