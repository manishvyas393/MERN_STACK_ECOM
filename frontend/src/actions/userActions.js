import {
      LOGIN_FAIL,
      LOGIN_REQUEST,
      LOGIN_SUCCESS,

      CLEAR_ERROR,

      REGISTER_USER_REQUEST,
      REGISTER_USER_SUCCESS,
      REGISTER_USER_FAIL,

      LOAD_USER_FAIL,
      LOAD_USER_REQUEST,
      LOAD_USER_SUCCESS,

      LOGOUT_FAIL,
      LOGOUT_SUCCESS


} from "../constants/userConstants"
import axios from "axios"
const Axios = axios.create({
      baseURL: "https://mern-stack-ecom.herokuapp.com",
      withCredentials: true,
      credentials: "include"

})
//login
export const login = (email, password) => async (dispatch) => {
      try {
            dispatch({ type: LOGIN_REQUEST })
            const { data } = await Axios.post("/api/login", { email, password })
            dispatch({ type: LOGIN_SUCCESS, payload: data.user })
            localStorage.setItem("user", JSON.stringify(data.user))

      } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.error })
      }
}
//register
export const register = (userData) => async (dispatch) => {
      try {
            dispatch({ type: REGISTER_USER_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await Axios.post("/api/register", userData, config)
            localStorage.setItem("user", JSON.stringify(data.user))
            dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
      } catch (error) {
            dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.error })
      }
}
//load user
export const loadUser = () => async (dispatch) => {
      try {
            dispatch({ type: LOAD_USER_REQUEST })
            const { data } = await Axios.get("/api/myprofile")
            localStorage.setItem("user", JSON.stringify(data.user))
            dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

      } catch (error) {

            dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error })
            localStorage.clear()
      }
}
export const logoutUser = () => async (dispatch) => {
      try {
            await Axios.get("/api/logout");
            localStorage.clear()
            dispatch({ type: LOGOUT_SUCCESS });

      }
      catch (error) {
            dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}