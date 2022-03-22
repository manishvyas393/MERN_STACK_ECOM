import {
      CREATE_NEW_ORDER_REQUEST,
      CREATE_NEW_ORDER_SUCCESS,
      CREATE_NEW_ORDER_FAIL,

      CLEAR_ERROR,

      GET_USER_ORDER_REQUEST,
      GET_USER_ORDER_SUCCESS,
      GET_USER_ORDER_FAIL,

      GET_ORDER_DETAILS_REQUEST,
      GET_ORDER_DETAILS_SUCCESS,
      GET_ORDER_DETAILS_FAIL,
} from "../constants/orderConstants"
import axios from "axios"

const Axios = axios.create({
      baseURL: "https://mern-stack-ecom.herokuapp.com",
      withCredentials: true,
      credentials: "include"

})

export const CreateNewOrder = (order) => async (dispatch) => {
      try {
            dispatch({ type: CREATE_NEW_ORDER_REQUEST });
            const config = {
                  headers: {
                        "Content-Type": "application/json",
                  },
            };
            const { data } = Axios.post("/api/neworder", order, config);
            dispatch({ type: CREATE_NEW_ORDER_SUCCESS, payload: data.order })
      } catch (error) {
            dispatch({
                  type: CREATE_NEW_ORDER_FAIL,
                  payload: error.response.data.message,
            });

      }

}
export const GetUserOrders = () => async (dispatch) => {
      try {
            dispatch({ type: GET_USER_ORDER_REQUEST })
            const { data } = await Axios.get("/api/myorders")
            dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data.orders })
      } catch (error) {
            dispatch({
                  type: GET_USER_ORDER_FAIL,
                  payload: error.response.data.message
            })
      }
}
export const GetUserOrderDetails = (id) => async (dispatch) => {
      try {
            dispatch({ type: GET_ORDER_DETAILS_REQUEST })
            const { data } = await Axios.get(`/api/getsingleorder/${id}`)
            dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: data.order })
      } catch (error) {
            dispatch({
                  type: GET_ORDER_DETAILS_FAIL,
                  payload: error.response.data.message
            })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}