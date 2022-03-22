import {
      ADMIN_ALL_USERS_REQUEST,
      ADMIN_ALL_USERS_SUCCESS,
      ADMIN_ALL_USERS_FAIL,

      ADMIN_DELETE_USER_REQUEST,
      ADMIN_DELETE_USER_SUCCESS,
      ADMIN_DELETE_USER_FAIL,

      ADMIN_GET_USER_DETAILS_REQUEST,
      ADMIN_GET_USER_DETAILS_SUCCESS,
      ADMIN_GET_USER_DETAILS_FAIL,

      ADMIN_UPDATE_USER_DETAILS_REQUEST,
      ADMIN_UPDATE_USER_DETAILS_SUCCESS,
      ADMIN_UPDATE_USER_DETAILS_FAIL,

      CLEAR_ERROR
} from "../constants/adminUsersConstants"
import axios from "axios"

const Axios = axios.create({
      baseURL: "https://mern-stack-ecom.herokuapp.com",
      withCredentials: true,
      credentials: "include"
})

export const getAdminAllUser = () => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_ALL_USERS_REQUEST })
            const { data } = await Axios.get("/api/admin/getallusers")
            dispatch({ type: ADMIN_ALL_USERS_SUCCESS, payload: data.users })
      } catch (error) {
            dispatch({ type: ADMIN_ALL_USERS_FAIL, payload: error.response.data.error })
      }
}
export const adminDeleteUserAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_DELETE_USER_REQUEST })
            const { data } = await Axios.delete(`/api/admin/user/delete/${id}`)
            dispatch({ type: ADMIN_DELETE_USER_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_DELETE_USER_FAIL, payload: error.response.data.error })
      }
}
export const adminGetUserDetailAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_GET_USER_DETAILS_REQUEST })
            const { data } = await Axios.get(`/api/admin/${id}/user`)
            dispatch({ type: ADMIN_GET_USER_DETAILS_SUCCESS, payload: data.user })
      } catch (error) {
            dispatch({ type: ADMIN_GET_USER_DETAILS_FAIL, payload: error.response.data.error })
      }
}
export const adminUpdateUserDetailAction = (id, userData) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_UPDATE_USER_DETAILS_REQUEST })
            const { data } = await Axios.put(`/api/admin/user/updaterole/${id}`, userData)
            dispatch({ type: ADMIN_UPDATE_USER_DETAILS_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_UPDATE_USER_DETAILS_FAIL, payload: error.response.data.error })
      }
}


export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}