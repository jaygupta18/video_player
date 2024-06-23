// Imports
import axios from "axios";

// Variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
      url: `https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json`,
      params: {
        q: query,
      },
    });
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

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (details) => {
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
