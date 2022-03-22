import { ADD_TO_CART, DELETE_ITEM_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants"

export const addToCartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {
      switch (action.type) {
            case ADD_TO_CART: 
                  const item = action.payload;
                  const isItemExisted = state.cartItems.find((i) => i.product === item.product)
                  if (isItemExisted) {
                        return {
                              ...state,
                              cartItems: state.cartItems.map((i) => i.product === isItemExisted.product ? item : i)
                        }
                  } else {
                        return {
                              ...state,
                              cartItems: [...state.cartItems, item]
                        }
                  }
            case DELETE_ITEM_FROM_CART:
                  return {
                        ...state,
                        cartItems: state.cartItems.filter((i) => i.product !== action.payload)
                  }
            case SAVE_SHIPPING_INFO:
                  return {
                        ...state,
                        shippingInfo: action.payload
                  }
            default:
                  return state
      }
}
