import {
      ALL_PRODUCT_FAIL,
      ALL_PRODUCT_SUCCESS,
      ALL_PRODUCT_REQUEST,

      PRODUCT_DETAILS_FAIL,
      PRODUCT_DETAILS_SUCCESS,
      PRODUCT_DETAILS_REQUEST,

      NEW_REVIEW_FAIL,
      NEW_REVIEW_REQUEST,
      NEW_REVIEW_SUCCESS,
      NEW_REVIEW_RESET,

      CLEAR_ERROR

} from "../constants/productConstants"

export const productReducer = (state = { products: [] }, action) => {
      switch (action.type) {
            case ALL_PRODUCT_REQUEST:
                  return {
                        loading: true,
                        products: []
                  }
            case ALL_PRODUCT_SUCCESS:
                  return {
                        loading: false,
                        products: action.payload.products,
                        productsCount: action.payload.ProductsCount,
                        resultPerPage: action.payload.resultPerPage,
                        filteredProducts: action.payload.filteredProducts
                  }
            case ALL_PRODUCT_FAIL:
                  return {
                        loading: false,
                        error: action.payload.error
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;



      }
}

export const productDetailReducer = (state = { product: {} }, action) => {
      switch (action.type) {
            case PRODUCT_DETAILS_REQUEST:
                  return {
                        loading: true,
                        ...state
                  }
            case PRODUCT_DETAILS_SUCCESS:
                  return {
                        loading: false,
                        product: action.payload.product
                  }
            case PRODUCT_DETAILS_FAIL:
                  return {
                        loading: false,
                        error: action.payload
                  }
            case CLEAR_ERROR:
                  return {
                        ...state,
                        error: null
                  }

            default:
                  return state;



      }
}
export const newReviewReducer = (state = {}, action) => {
      switch (action.type) {
            case NEW_REVIEW_REQUEST:
                  return {
                        ...state,
                        loading: true,
                  }
            case NEW_REVIEW_SUCCESS:
                  return {
                        loading: false,
                        success: action.payload
                  }
            case NEW_REVIEW_RESET:
                  return {
                        ...state,
                        success: false,
                  }
            case NEW_REVIEW_FAIL:
                  return {
                        ...state,
                        loading: false,
                        error: action.payload,
                  };
            default:
                  return state
      }
}