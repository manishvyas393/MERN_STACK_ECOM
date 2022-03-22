import {
      GET_ADMIN_ORDER_REQUEST,
      GET_ADMIN_ORDER_SUCCESS,
      GET_ADMIN_ORDER_FAIL,

      ADMIN_DELETE_ORDER_REQUEST,
      ADMIN_DELETE_ORDER_SUCCESS,
      ADMIN_DELETE_ORDER_FAIL,

      ADMIN_UPDATE_ORDER_REQUEST,
      ADMIN_UPDATE_ORDER_SUCCESS,
      ADMIN_UPDATE_ORDER_FAIL,
      CLEAR_ERROR
} from "../constants/adminOrderConstants"
import axios from "axios"
const Axios = axios.create({
      baseURL: "https://mern-stack-e-com.herokuapp.com",
      withCredentials: true,
      credentials: "include"

})
export const getAdminAllOrders = () => async (dispatch) => {
      try {
            dispatch({ type: GET_ADMIN_ORDER_REQUEST })
            const { data } = await Axios.get("/api/admin/getallorders")
            dispatch({ type: GET_ADMIN_ORDER_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: GET_ADMIN_ORDER_FAIL, payload: error.response.data.error })
      }
}
export const adminDeleteOrderAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_DELETE_ORDER_REQUEST })
            const { data } = await Axios.delete(`/api/admin/deleteorder/${id}`)
            dispatch({ type: ADMIN_DELETE_ORDER_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_DELETE_ORDER_FAIL, payload: error.response.data.error })
      }
}
export const adminUpdateOrderAction = (id, form) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_UPDATE_ORDER_REQUEST })
            const { data } = await Axios.put(`/api/admin/updateorder/${id}`, form)
            dispatch({ type: ADMIN_UPDATE_ORDER_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_UPDATE_ORDER_FAIL, payload: error.response.data.error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}