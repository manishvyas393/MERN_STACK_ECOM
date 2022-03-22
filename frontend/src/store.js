import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productReducer, productDetailReducer, newReviewReducer } from "./reducers/productReducer"
import {userReducer} from "./reducers/userReducer"
import { userProfileReducer } from "./reducers/userProfileReducer"
import { forgotPasswordReducer, ResetForgotPasswordReducer } from "./reducers/forgotPasswordReducer"
import { addToCartReducer } from "./reducers/cartReducer"
import { MyOrderDetailsReducers, MyOrdersReducers, NewOrderReducer } from "./reducers/orderReducer"
import { adminDeleteProductReducer, adminDeleteProductReviewReducer, adminGetProductReviewReducer, adminNewProductReducer, adminUpdateProductDetailsReducer, adminUpdateProductImagesReducer, getAllAdminProductsReducer } from "./reducers/adminProductsReducer"
import { adminDeleteUserReducer, adminGetAllUsersReducer, adminGetUserDetailsReducer, adminUpdateUserReducer } from "./reducers/adminAllUsersReducer"
import { adminDeleteOrderReducer, adminUpdateOrderReducer, getAllAdminOrdersReducer } from "./reducers/adminAllOrdersReducer"
const reducer = combineReducers({
      products: productReducer,
      productDetails: productDetailReducer,
      user: userReducer,
      ProfileUpdate: userProfileReducer,
      forgotPassword: forgotPasswordReducer,
      resetForgotPassword:ResetForgotPasswordReducer,
      cart: addToCartReducer,
      newOrder: NewOrderReducer,
      userOrders: MyOrdersReducers,
      userOrderDetails: MyOrderDetailsReducers,
      newReview: newReviewReducer,
      adminProducts: getAllAdminProductsReducer,
      adminAllUsers: adminGetAllUsersReducer,
      adminAllOrders: getAllAdminOrdersReducer,
      adminDeleteProduct: adminDeleteProductReducer,
      adminDeleteUser: adminDeleteUserReducer,
      adminDeleteOrder: adminDeleteOrderReducer,
      adminNewProduct: adminNewProductReducer,
      adminUserRequestedDetail: adminGetUserDetailsReducer,
      adminUserDetailUpdate: adminUpdateUserReducer,
      adminUpdateproductImages: adminUpdateProductImagesReducer,
      adminUpdateProductDetail:adminUpdateProductDetailsReducer,
      adminUpdateOrder: adminUpdateOrderReducer,
      adminProductReviews: adminGetProductReviewReducer,
      adminDeleteReview:adminDeleteProductReviewReducer

})
let initialState = {
      cart: {
            cartItems: localStorage.getItem("cartItems") ?
                  JSON.parse(localStorage.getItem("cartItems")) : [],
            shippingInfo:localStorage.getItem("ShippingInfo")?JSON.parse(localStorage.getItem("ShippingInfo")):{},
      },
}
const midleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))
export default store