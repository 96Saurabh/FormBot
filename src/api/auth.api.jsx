import axios from "axios";

const backendUrl = `https://formbot-backend-5fip.onrender.com/api/v1/auth`;

export const registerUser = async ({ email, password, name }) => {
    try {
        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl, {
            name,
            password,
            email,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
        return null;
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl, {
            password,
            email,
        });
        if (response.data?.token) {
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("name", JSON.stringify(response.data?.name));
            localStorage.setItem("userId", JSON.stringify(response.data?.userId));
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
        return false;
    }
};



export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${backendUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    return null;
  }
};



export const updateUser = async ({ userId, name, email, password }) => {
    try {
        const reqUrl = `${backendUrl}/user/${userId}`;
        const response = await axios.put(reqUrl, {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
        return null;
    }
};
