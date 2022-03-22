import axios from "axios";

import {
      ALL_PRODUCT_FAIL,
      ALL_PRODUCT_SUCCESS,
      ALL_PRODUCT_REQUEST,

      CLEAR_ERROR,

      PRODUCT_DETAILS_REQUEST,
      PRODUCT_DETAILS_SUCCESS,
      PRODUCT_DETAILS_FAIL,

      NEW_REVIEW_FAIL,
      NEW_REVIEW_REQUEST,
      NEW_REVIEW_SUCCESS,
} from "../constants/productConstants"
//getProducts
const Axios = axios.create({
      baseURL: "https://mern-stack-ecom.herokuapp.com",
      withCredentials: true,
      credentials: "include"

})
export const getProducts = (keyword = "", currentPage = 1, price = [0, 200000], category, ratings = 0) => async (dispatch) => {
      try {
            dispatch({ type: ALL_PRODUCT_REQUEST });
            let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            if (category) {
                  link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`

            }
            const { data } = await Axios.get(link)
            dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data })
      }
      catch (error) {
            dispatch({
                  type: ALL_PRODUCT_FAIL,
                  payload: error
            })
      }
}
//getSingleProduct
export const getProductDetails = (id) => async (dispatch) => {
      try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST });
            const { data } = await Axios.get(`/api/singleProduct/${id}`)
            dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
      }
      catch (error) {
            dispatch({
                  type: PRODUCT_DETAILS_FAIL,
                  payload: error.response.data.message
            })
      }
}
export const newReview = (review) => async (dispatch) => {
      try {
            dispatch({ type: NEW_REVIEW_REQUEST });
            const config = {
                  headers: {
                        "Content-Type": "application/json",
                  },
            };
            const { data } = await Axios.put("/api/review", review, config)
            dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message })
      }
}
//clear errors
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}