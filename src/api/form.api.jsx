import axios from "axios";
const backendUrl = "https://formbot-backend-5fip.onrender.com/api/v1/from";

export const createChat = async (chatPostPayload) => {
  try {
    const reqUrl = `${backendUrl}/create-chat`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, chatPostPayload);
    console.log('Response of createChat:', response);
    return response.data;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error.response.data;
  }
};
export const getChats = async () => {
  try {
    const reqUrl = `${backendUrl}/create-chat`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(`${reqUrl}/get-chats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chats", error);
    if (error.response) {
      // Handle specific error responses from the server
      throw new Error(
        error.response.data.errorMessage || "Error fetching chats"
      );
    } else {
      throw new Error("Error fetching chats");
    }
  }
};

export const deleteChat = async (chatId) => {
  const response = await fetch(`${backendUrl}/delete-chat/${chatId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you handle tokens
    },
  });
  return response.json();
};

export const getMessagesByChat = async (chatId) => {
  const response = await fetch(`${backendUrl}/get-messages/${chatId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you handle tokens
    },
  });
  return response.json();
};
