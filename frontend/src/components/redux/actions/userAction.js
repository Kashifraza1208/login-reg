import toast from "react-hot-toast";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

// Function to set user authentication status in localStorage
const setAuthStatusInLocalStorage = (status) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(status));
};

// Login

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:8000/api/v1/login`,
      { email, password },
      config
    );
    setAuthStatusInLocalStorage(true);
    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login Successfully");
      navigate("/");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register =
  (name, dateOfBirth, email, password, navigate) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `http://localhost:8000/api/v1/register`,
        { name, dateOfBirth, email, password },
        config
      );
      setAuthStatusInLocalStorage(true);
      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("User Registered Successfully");
        navigate("/");
      }
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// Logout User
export const logout = (navigate) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/v1/logout`);
    if (data.success === true) {
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    }
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`http://localhost:8000/api/v1/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
