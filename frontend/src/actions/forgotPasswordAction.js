import {
      FORGOT_PASSWORD_FAIL,
      FORGOT_PASSWORD_SUCCESS,
      FORGOT_PASSWORD_REQUEST,

      RESET_FORGOT_PASSWORD_FAIL,
      RESET_FORGOT_PASSWORD_REQUEST,
      RESET_FORGOT_PASSWORD_SUCCESS,


      CLEAR_ERROR
} from "../constants/forgotPassword";
import axios from "axios";
const Axios = axios.create({
      baseURL: "https://mern-stack-ecom.herokuapp.com",
      withCredentials: true,
      credentials: "include"

})
export const forgotPassword = (userData) => async (dispatch) => {
      try {
            dispatch({ type: FORGOT_PASSWORD_REQUEST })
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await Axios.post("/api/password/forgot", userData, config)
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
      } catch (error) {
            dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.error })
      }
}

export const ResetForgotPassword = (token, userData) => async (dispatch) => {
      try {
            dispatch({ type: RESET_FORGOT_PASSWORD_REQUEST })
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await Axios.put(`/api/password/reset/${token}`, userData, config)
            dispatch({ type: RESET_FORGOT_PASSWORD_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: RESET_FORGOT_PASSWORD_FAIL, payload: error.response.data.error })
      }
}


export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}