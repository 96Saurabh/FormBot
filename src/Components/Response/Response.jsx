import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Response.module.css";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const URL = "http://localhost:8000/api/v1";

function Response() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [views, setViews] = useState(0); 
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`${URL}/response/responses`);
        console.log("Fetched responses:", response.data); // Check the structure of the data
        setResponses(response.data);

        // Extract unique labels
        const allLabels = new Set();
        response.data.forEach((res) => {
          res.responses.forEach((r) => {
            if (r.label) {
              allLabels.add(r.label);
            }
          });
        });
        const uniqueLabels = Array.from(allLabels);
        console.log("Extracted labels:", uniqueLabels);
        setLabels(uniqueLabels);

        // Assuming views are part of the response
        if (response.data.length > 0) {
          setViews(response.data[0].views); // Get views from the first form
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={style.navbar}>
        <div className={style["navbar-center"]}>
          <Link to="/FormPage">Flow</Link>
          <Link to="/workspace/theme">Theme</Link>
          <Link to="/workspace/response">Response</Link>
        </div>
        <div className={style["navbar-end"]}>
          <span className={style.share}>Share</span>
          <span className={style.save}>Save</span>
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
            <h4>Views</h4>
            <h4>{views}</h4> 
          </div>
          <div className={style.header}>Start</div>
          <div className={style.header}>Completion rate</div>
        </div>
        <div className={style.responsedata}>
          {responses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Submitted At</th>
                  {labels.map((label, index) => (
                    <th key={index}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => {
                  // Create an object for each response with label-value pairs
                  const responseMap = {};
                  response.responses.forEach((res) => {
                    responseMap[res.label] = res.response; // Ensure 'res.response' contains the value
                  });
                  console.log("Response Map:", responseMap); // Log the map to see if values are present

                  return (
                    <tr key={response._id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(response.createdAt).toLocaleDateString()}
                      </td>
                      {labels.map((label, idx) => (
                        <td key={idx}>
                          {responseMap[label] ? responseMap[label] : ""}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className={style.emptydata}>No responses are available</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Response;
