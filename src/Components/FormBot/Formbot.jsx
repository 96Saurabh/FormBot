import { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Formbot.module.css';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters

const URL = "http://localhost:8000/api/v1";

function Formbot() {
  const { formId } = useParams(); // Get formId from URL parameters
  const [chats, setChats] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [inputs, setInputs] = useState({
    date: '',
    email: '',
    number: '',
    tel: '',
  });
  const [responses, setResponses] = useState([]);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false); // Track if save button is active

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${URL}/form/${formId}`);
        console.log('API response:', response.data);
        if (response.data && Array.isArray(response.data.fields)) {
          setChats(response.data.fields);
        } else {
          console.error('API response does not contain fields array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [formId]);

  useEffect(() => {
    if (chats.length > 0 && currentChatIndex < chats.length) {
      const chat = chats[currentChatIndex];
      if (chat && ['text', 'url'].includes(chat.type)) {
        const timer = setTimeout(() => {
          handleNextClick();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentChatIndex, chats]);

  useEffect(() => {
    if (chats.length > 0 && currentChatIndex >= chats.length) {
      setIsSaveButtonActive(true); // Enable save button once all responses are collected
    }
  }, [currentChatIndex, chats]);

  const isImageUrl = (url) => /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
  const isVideoUrl = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isYouTubeUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(url);

  const handleInputChange = (event, type) => {
    const value = event.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [type]: value
    }));
  };

  const handleNextClick = () => {
    const chat = chats[currentChatIndex];
  
    if (chat) {
      if (['date', 'email', 'number', 'tel'].includes(chat.type)) {
        const isFieldCompleted = inputs[chat.type].trim() !== '';
        if (isFieldCompleted) {
          setResponses((prevResponses) => [
            ...prevResponses,
            {
              chatId: chat._id,
              response: inputs[chat.type],
              label: chat.label || '',
              value: chat.value || ''  
            }
          ]);
          setCurrentChatIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        setResponses((prevResponses) => [
          ...prevResponses,
          {
            chatId: chat._id,
            response: '',
            label: chat.label || '',
            value: chat.value || ''
          }
        ]);
        setCurrentChatIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handleSaveResponses = async () => {
    console.log('Saving responses:', responses);
    try {
      await axios.post(`${URL}/response/save-responses`, { formId, responses });
      window.alert('Thank you!');
    } catch (error) {
      console.error('Error saving responses:', error);
    }
  };
  
  return (
    <div className={style.formbot}>
      <div className={style.container}>
        {chats.slice(0, currentChatIndex + 1).map((chat) => (
          <div
            className={`${style.formbotItem} ${style[chat.type]}`}
            key={chat._id}
          >
            {chat.type === 'text' && <p>{chat.value}</p>}
            {chat.type === 'url' && (
              <>
                {isImageUrl(chat.value) ? (
                  <img src={chat.value} alt="Chat content" style={{ height: "250px", width: "400px" }} />
                ) : isVideoUrl(chat.value) ? (
                  <video src={chat.value} controls style={{ height: "250px", width: "400px" }} />
                ) : isYouTubeUrl(chat.value) ? (
                  <iframe
                    width="400"
                    height="250"
                    src={chat.value.replace("watch?v=", "embed/")}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                  ></iframe>
                ) : (
                  <p>Unsupported media type</p>
                )}
              </>
            )}
            {['date', 'email', 'number', 'tel'].includes(chat.type) && (
              <div className={style.inputWrapper}>
                <label>{chat.type.charAt(0).toUpperCase() + chat.type.slice(1)}</label>
                <input
                  type={chat.type}
                  value={inputs[chat.type] || ''}
                  onChange={(event) => handleInputChange(event, chat.type)}
                  className={style.inputField}
                />
                <button onClick={handleNextClick} className={style.nextButton}>Next</button>
              </div>
            )}
          </div>
        ))}
        {isSaveButtonActive && (
          <button
            onClick={handleSaveResponses}
            className={style.saveButton}
            style={{ marginTop: "20px" }}
          >
            Save Responses
          </button>
        )}
      </div>
    </div>
  );
}

export default Formbot;
