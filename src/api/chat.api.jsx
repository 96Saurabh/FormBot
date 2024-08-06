import axios from "axios";
const backendUrl = `http://localhost:8000/api/v1/chat`;

// this is the folder api
export const createFolder = async (chatPostPayload) => {
  try {
    const reqUrl = `${backendUrl}/create-folder`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, chatPostPayload);
    console.log("response of folder", response);
    return response.data;
  } catch (error) {
    console.error("Error creating folder", error);
    throw error.response.data;
  }
};

export const getFolders = async () => {
  try {
    const reqUrl = `${backendUrl}/get-folders`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    console.log("response of folders", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching folders", error);
    throw error.response.data;
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const reqUrl = `${backendUrl}/delete-folder/${folderId}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.delete(reqUrl);
    console.log("Folder deleted:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting folder", error);
    throw error.response.data;
  }
};

export const getFormsByFolder = async (folderId) => {
  try {
    const reqUrl = `${backendUrl}/get-forms/${folderId}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response.data.forms;
  } catch (error) {
    console.error("Error fetching forms by folder:", error);
    throw error.response.data;
  }
};
