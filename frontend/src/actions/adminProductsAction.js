import {
      ADMIN_ALL_PRODUCT_REQUEST,
      ADMIN_ALL_PRODUCT_SUCCESS,
      ADMIN_ALL_PRODUCT_FAIL,

      ADMIN_DELETE_PRODUCT_REQUEST,
      ADMIN_DELETE_PRODUCT_SUCCESS,
      ADMIN_DELETE_PRODUCT_FAIL,

      ADMIN_NEW_PRODUCT_REQUEST,
      ADMIN_NEW_PRODUCT_SUCCESS,
      ADMIN_NEW_PRODUCT_FAIL,

      ADMIN_UPDATE_PRODUCT_IMAGES_REQUEST,
      ADMIN_UPDATE_PRODUCT_IMAGES_SUCCESS,
      ADMIN_UPDATE_PRODUCT_IMAGES_FAIL,

      ADMIN_UPDATE_PRODUCT_REQUEST,
      ADMIN_UPDATE_PRODUCT_SUCCESS,
      ADMIN_UPDATE_PRODUCT_FAIL,

      ADMIN_PRODUCT_REVIEW_REQUEST,
      ADMIN_PRODUCT_REVIEW_SUCCESS,
      ADMIN_PRODUCT_REVIEW_FAIL,

      ADMIN_DELETE_PRODUCT_REVIEW_REQUEST,
      ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS,
      ADMIN_DELETE_PRODUCT_REVIEW_FAIL,


      CLEAR_ERROR,
} from "../constants/adminProductsConstants";
import axios from "axios";
const Axios = axios.create({
      baseURL: "https://mern-stack-ecom.herokuapp.com",
      withCredentials: true,
      credentials: "include"

})

export const adminAllProductsAction = () => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_ALL_PRODUCT_REQUEST })
            const { data } = await Axios.get("/api/admin/products")
            dispatch({ type: ADMIN_ALL_PRODUCT_SUCCESS, payload: data.products })
      } catch (error) {
            dispatch({ type: ADMIN_ALL_PRODUCT_FAIL, payload: error.response.data.error })
      }
}
export const adminDeleteProductAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST })
            const { data } = await Axios.delete(`/api/admin/product/${id}`)
            dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_DELETE_PRODUCT_FAIL, payload: error.response.data.error })
      }
}
export const adminNewProductAction = (form) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_NEW_PRODUCT_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await Axios.post("/api/admin/product/new", form, config)
            dispatch({ type: ADMIN_NEW_PRODUCT_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_NEW_PRODUCT_FAIL, payload: error.response.data.error })
      }
}
export const adminUpdateProductDetailAction = (id, userData) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST })
            const config = {
                  headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                  },
            }
            const { data } = await Axios.put(`/api/admin/updateproduct/details/${id}`, userData, config)
            dispatch({ type: ADMIN_UPDATE_PRODUCT_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_UPDATE_PRODUCT_FAIL, payload: error.response.data.error })
      }
}
export const adminUpdateProductImagesAction = (id, images) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_UPDATE_PRODUCT_IMAGES_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await Axios.put(`/api/admin/updateproduct/images/${id}`, images, config)
            dispatch({ type: ADMIN_UPDATE_PRODUCT_IMAGES_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_UPDATE_PRODUCT_IMAGES_FAIL, payload: error.response.data.error })
      }
}
export const adminGetProductReviewAction = (id) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_PRODUCT_REVIEW_REQUEST })
            const { data } = await Axios.get(`/api/getProductreviews?id=${id}`)
            dispatch({ type: ADMIN_PRODUCT_REVIEW_SUCCESS, payload: data.reviews })
      } catch (error) {
            dispatch({ type: ADMIN_PRODUCT_REVIEW_FAIL, payload: error.response.data.error })
      }
}
export const adminDeleteProductReviewAction = (productId, id) => async (dispatch) => {
      try {
            dispatch({ type: ADMIN_DELETE_PRODUCT_REVIEW_REQUEST })
            const { data } = await Axios.delete(`/api/deletereview?productId=${productId}&id=${id}`)
            dispatch({ type: ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS, payload: data.success })
      } catch (error) {
            dispatch({ type: ADMIN_DELETE_PRODUCT_REVIEW_FAIL, payload: error.response.data.error })
      }
}
export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERROR })
}

