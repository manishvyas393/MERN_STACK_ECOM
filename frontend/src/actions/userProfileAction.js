import {
      UPDATE_PROFILE_REQUEST,
      UPDATE_PROFILE_SUCCESS,
      UPDATE_PROFILE_FAIL,

      UPDATE_PASSWORD_FAIL,
      UPDATE_PASSWORD_REQUEST,
      UPDATE_PASSWORD_SUCCESS,

      CLEAR_ERROR
} from "../constants/userProfileConstants";
import axios from "axios";
const Axios = axios.create({
      baseURL: "https://mern-stack-ecom.herokuapp.com",
      withCredentials: true,
      credentials: "include"
})
export const updateUserProfile = (userData) => async (dispatch) => {
      try {
            dispatch({ type: UPDATE_PROFILE_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await Axios.put("/api/myprofile/update", userData, config)
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.error })
      }
}
export const passwordUpdate = (passwords) => async (dispatch) => {
      try {
            dispatch({ type: UPDATE_PASSWORD_REQUEST })
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await Axios.put("/api/update/password", passwords, config)
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}