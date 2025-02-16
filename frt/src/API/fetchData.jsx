// Imports
import axios from "axios";
const BASE_URL = "https://video-player-server-w49h.onrender.com";

export const homeInitState = {
  loading: false,
  error: null,
  data: [],
};
export const homeReducer = (state = homeInitState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_LOADING": {
      return { loading: true, error: null, data: [] };
    }
    case "UPDATE_ERROR": {
      return { loading: false, error: "Failed to fetch data", data: [] };
    }
    case "UPDATE_SUCCESS": {
      return { loading: false, error: null, data: [...payload.data.data] };
    }
    default: {
      throw new Error("Invalid Action Type", state);
    }
  }
}; 

export const getHomePageData = async (dispatch) => {
  dispatch({ type: "UPDATE_LOADING" });
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/videos`,
     
    });
    console.log(response);
    dispatch({ type: "UPDATE_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "UPDATE_ERROR" });
  }
}; 

export const getSingleVideo = async (target, id) => {
  try {
    const response = await axios({
      method: "GET",
      url:
        target === "videos"
          ? `${BASE_URL}/${target}/${id}`
          : `${BASE_URL}/${target}/id/${id}`,
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
};
                            
export const searchVideos = async (query) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/videos/search?query=${query}`,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/user/login`,
      data: credentials,
    });

    if (response.status === 200) {
      return response; 
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (token) => {
  
  try {
      const res = await axios.get( `${BASE_URL}/user/info`, {
          headers: { Authorization: token }
      });
      return res;
  } catch (err) {
      alert("not found");
  }
};  
export const registerUser = async (details) => {
  console.log(details);
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/user/register`,
      data: details,
    });

    return response;
  } catch (error) {
    throw new Error("Something went wrong", error.message);
  }
}; 

export const uploadYourVideo = async (details) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/uploads/video`,
      data: { ...details },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getYourVideos = async (email) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/uploads/email/${email}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
