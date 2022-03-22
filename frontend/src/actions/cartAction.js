import { ADD_TO_CART, DELETE_ITEM_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants"
import axios from "axios";
const Axios = axios.create({
      baseURL: "https://mern-stack-e-com.herokuapp.com",
      withCredentials: true,
      credentials: "include"

})
//ADD TO CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
      try {
            const { data } = await Axios.get(`https://mern-stack-e-com.herokuapp.com/api/singleProduct/${id}`)
            dispatch({
                  type: ADD_TO_CART,
                  payload: {
                        product: data.product._id,
                        name: data.product.name,
                        price: data.product.price,
                        image: data.product.images[0].url,
                        stock: data.product.stock,
                        quantity
                  }
            })
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
      } catch (error) {

      }
}

//REMOVE FROM CART
export const deleteItemFromCart = (id) => async (dispatch, getState) => {
      dispatch({ type: DELETE_ITEM_FROM_CART, payload: id })
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
//SAVE SHIPPING INFO
export const SaveShippingInfo = (ShippingData) => async (dispatch) => {
      dispatch({ type: SAVE_SHIPPING_INFO, payload: ShippingData })
      localStorage.setItem("ShippingInfo", JSON.stringify(ShippingData))
}