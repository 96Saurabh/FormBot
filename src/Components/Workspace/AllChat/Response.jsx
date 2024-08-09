import { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Response.module.css'; // Ensure this path is correct

const URL = "https://formbot-backend-5fip.onrender.com/api/v1/chat/responses";

function Responses() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(URL);
        console.log('Fetched responses:', response.data); // Log data to check its structure
        setResponses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching responses:', error);
        setError('Failed to fetch responses.');
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  if (loading) return <div className={style.loading}>Loading...</div>;
  if (error) return <div className={style.error}>{error}</div>;

  return (
    <div className={style.responses}>
      <h2>Responses</h2>
      <div className={style.container}>
        {responses.length === 0 ? (
          <div className={style.noResponses}>
            <span>No responses available</span>
          </div>
        ) : (
          responses.map((response) => (
            <div className={style.responseItem} key={response._id}>
              <div className={style.responseDetail}>
                <span className={style.label}>Chat ID:</span>
                <span className={style.value}>{response.chatId || 'N/A'}</span>
              </div>
              <div className={style.responseDetail}>
                <span className={style.label}>Response:</span>
                <span className={style.value}>{response.response || 'N/A'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Responses;
